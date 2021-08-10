package com.elgin.utilityelginpay.Controller;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.util.Base64;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.elgin.e1.Impressora.Termica;
import com.elgin.e1.Impressora.Utilidades.CodigoErro;
import com.elgin.utilityelginpay.BuildConfig;

import java.io.File;
import java.util.List;

import br.com.setis.interfaceautomacao.AplicacaoNaoInstaladaExcecao;
import br.com.setis.interfaceautomacao.Confirmacoes;
import br.com.setis.interfaceautomacao.DadosAutomacao;
import br.com.setis.interfaceautomacao.EntradaTransacao;
import br.com.setis.interfaceautomacao.Personalizacao;
import br.com.setis.interfaceautomacao.SaidaTransacao;
import br.com.setis.interfaceautomacao.StatusTransacao;
import br.com.setis.interfaceautomacao.TerminalNaoConfiguradoExcecao;
import br.com.setis.interfaceautomacao.Transacoes;
import br.com.setis.interfaceautomacao.ViasImpressao;

public class ElginPAY extends Thread {

    private static final int FIM_OPERACAO = 0;
    private static final int FIM_IMPRESSAO = 1;
    private static final int FIM_CONFIRMACAO = 2;
    private static final int ERRO_IMPRESSAO = 3;
    private static final int TRANSACAO_PENDENTE = 4;

    private Handler handler, mHandler;
    private EntradaTransacao entradaTransacao;
    private SaidaTransacao saidaTransacao;
    private Transacoes transacoes;
    private Message message;
    private Context context;
    private Confirmacoes confirmacoes;

    public ElginPAY(){

    }

    public ElginPAY(@NonNull EntradaTransacao e, @NonNull Handler h, @NonNull Context c){
        this.mHandler = h;
        this.entradaTransacao = e;
        this.context = c;
        transacoes = Transacoes.obtemInstancia(obtemDadosAutomacao(), context);
        confirmacoes = new Confirmacoes();

        //USADO PARA ENVIAR E PROCESSAR MENSAGENS
        handler = new Handler(Looper.getMainLooper()) {
            @Override
            public void handleMessage(@NonNull Message msg) {
                switch (msg.what) {
                    case ElginPAY.FIM_OPERACAO:
                        finalizaVenda();
                        break;

                    case ElginPAY.FIM_IMPRESSAO:
                        apresentaMensagemPadrao();
                        break;

                    case FIM_CONFIRMACAO:
                        imprimeComprovante();
                        break;

                    case ERRO_IMPRESSAO:
                        Toast.makeText(context,
                                "PROBLEMA NA IMPRESSÃO\n" +
                                        "O comprovante poderá ser reimpresso pelo menu administrativo!",
                                Toast.LENGTH_LONG).show();
                        apresentaMensagemPadrao();
                        break;

                    case TRANSACAO_PENDENTE:
                        resolveTransacaoPendente();
                        break;

                    default:
                        apresentaMensagemPadrao();
                        break;
                }
            }
        };

    }

    @Override
    public void run(){
        message = new Message();
        try {

            saidaTransacao = transacoes.realizaTransacao(entradaTransacao);

            if(saidaTransacao.existeTransacaoPendente()){
                message.what = TRANSACAO_PENDENTE;
            }else {
                message.what = FIM_OPERACAO;
            }
            //Envia mensagem para thread principal que fez a chamada
            handler.sendMessage(message);

        } catch (TerminalNaoConfiguradoExcecao | AplicacaoNaoInstaladaExcecao e) {
            e.printStackTrace();
            message.what = -1;
            message.obj = e.toString();
            handler.sendMessage(message);
        }
    }

    public DadosAutomacao obtemDadosAutomacao(){
        return new DadosAutomacao("Elgin S/A",
                "ELGIN S/A",
                BuildConfig.VERSION_NAME,
                true,
                true,
                true,
                false,
                obtemPersonalizacaoCliente());
    }

    private Personalizacao obtemPersonalizacaoCliente(){
        Personalizacao.Builder pb = new Personalizacao.Builder();
//        pb.informaCorFonte("#FC9F00");
//        pb.informaCorFonteTeclado("#FC9F00");
//        pb.informaCorFundoToolbar("#FC9F00");
//        pb.informaCorFundoTela("#0C0807");
//        pb.informaCorTeclaLiberadaTeclado("#464B4E");
//        pb.informaCorFundoTeclado("#1B1A1C");
//        pb.informaCorTextoCaixaEdicao("#464B4E");
//        pb.informaCorSeparadorMenu("#FC9F00");

        Personalizacao personalizacao = pb.build();
        return personalizacao;
    }

    private void imprimeComprovante(){
        message = new Message();
        ViasImpressao v = saidaTransacao.obtemViasImprimir();

        if(v == ViasImpressao.VIA_NENHUMA){
            message.what = FIM_IMPRESSAO;
            handler.sendMessage(message);
            return;
        }

        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        AlertDialog a;

        Termica.setContext(context);
        Termica.AbreConexaoImpressora(5, "SMARTPOS", "", 0);

        int ret = Termica.StatusImpressora(0);
        if (ret != 5) {
            //INDICANDO SEM PAPAL
            builder.setTitle("Erro na impressão");
            builder.setMessage("Impressora sem papel\nTroque a bonina");
            builder.setPositiveButton("Reimprimir", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    Termica.FechaConexaoImpressora();
                    imprimeComprovante();
                }
            });

            builder.setNegativeButton("Sair", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    Termica.FechaConexaoImpressora();
                    message.what = ERRO_IMPRESSAO;
                    handler.sendMessage(message);
                }
            });

            a = builder.create();
            a.setCanceledOnTouchOutside(false);
            a.setCancelable(false);
            a.show();
        }else {

            if(v == ViasImpressao.VIA_CLIENTE_E_ESTABELECIMENTO){
                if(saidaTransacao.comprovanteGraficoDisponivel()){
                    imprimeImagem(saidaTransacao.obtemComprovanteGraficoLojista());
                }else {
                    List<String> comprovante = saidaTransacao.obtemComprovanteDiferenciadoLoja();
                    if(comprovante == null || comprovante.size() <= 1){
                        comprovante = saidaTransacao.obtemComprovanteCompleto();
                    }
                    imprimeLista(comprovante);
                }

                Termica.AvancaPapel(4);
                Termica.FechaConexaoImpressora();

                builder.setTitle("Comprovante Cliente");
                builder.setMessage("Deseja imprimir via do Cliente?");
                builder.setPositiveButton("Sim", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        saidaTransacao.informaViasImprimir(ViasImpressao.VIA_CLIENTE);
                        imprimeComprovante();
                    }
                });

                builder.setNegativeButton("Não", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        message.what = FIM_IMPRESSAO;
                        handler.sendMessage(message);
                    }
                });

                a = builder.create();
                a.setCancelable(false);
                a.setCanceledOnTouchOutside(false);
                a.show();
            }else if(v == ViasImpressao.VIA_CLIENTE){
                if(saidaTransacao.comprovanteGraficoDisponivel()) {
                    imprimeImagem(saidaTransacao.obtemComprovanteGraficoPortador());
                }else {
                    List<String> comprovante = saidaTransacao.obtemComprovanteDiferenciadoPortador();
                    if (comprovante == null || comprovante.size() <= 1) {
                        comprovante = saidaTransacao.obtemComprovanteCompleto();
                    }
                    imprimeLista(comprovante);
                }
                Termica.AvancaPapel(4);
                Termica.FechaConexaoImpressora();

                message.what = FIM_IMPRESSAO;
                handler.sendMessage(message);

            }else if(v == ViasImpressao.VIA_ESTABELECIMENTO){
                if(saidaTransacao.comprovanteGraficoDisponivel()) {
                    imprimeImagem(saidaTransacao.obtemComprovanteGraficoLojista());
                }else {
                    List<String> comprovante = saidaTransacao.obtemComprovanteDiferenciadoLoja();
                    if(comprovante == null || comprovante.size() <= 1){
                        comprovante = saidaTransacao.obtemComprovanteCompleto();
                    }
                    imprimeLista(comprovante);
                }

                Termica.AvancaPapel(4);
                Termica.FechaConexaoImpressora();

                message.what = FIM_IMPRESSAO;
                handler.sendMessage(message);
            }
        }
    }

    private void finalizaVenda(){
        if(saidaTransacao.obtemInformacaoConfirmacao()
                && saidaTransacao.obtemResultadoTransacao() == 0) {
            confirmacoes.informaIdentificadorConfirmacaoTransacao(saidaTransacao.obtemIdentificadorConfirmacaoTransacao());
            confirmacoes.informaStatusTransacao(StatusTransacao.CONFIRMADO_AUTOMATICO);
            transacoes.confirmaTransacao(confirmacoes);
        }

        message = new Message();
        message.what = FIM_CONFIRMACAO;
        handler.sendMessage(message);
    }

    private void resolveTransacaoPendente(){
        message = new Message();
        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        builder.setTitle("Erro na Venda!");
        builder.setMessage(saidaTransacao.obtemMensagemResultado() + "\n\nDeseja confirmar a transação?");
        builder.setPositiveButton("SIM", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                confirmacoes.informaStatusTransacao(StatusTransacao.CONFIRMADO_AUTOMATICO);
                transacoes.resolvePendencia(saidaTransacao.obtemDadosTransacaoPendente(), confirmacoes);
                message.what =-1;
                handler.sendMessage(message);
            }
        });
        builder.setNegativeButton("Não", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                confirmacoes.informaStatusTransacao(StatusTransacao.DESFEITO_MANUAL);
                transacoes.resolvePendencia(saidaTransacao.obtemDadosTransacaoPendente(), confirmacoes);
                message.what =-1;
                handler.sendMessage(message);
            }
        });

        AlertDialog alertDialog = builder.create();
        alertDialog.setCanceledOnTouchOutside(false);
        alertDialog.setCancelable(false);
        alertDialog.show();
    }

    private void apresentaMensagemPadrao(){
        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        AlertDialog a;
        builder.setTitle("Retorno");
        builder.setMessage(saidaTransacao.obtemMensagemResultado());
        builder.setPositiveButton("OK", null);
        a = builder.create();
        a.setCanceledOnTouchOutside(false);
        a.setCancelable(false);
        a.show();

        message = new Message();
        message.obj = saidaTransacao;
        mHandler.sendMessage(message);
    }

    private void imprimeLista(List<String> a){
        for (int b = 0; b < a.size(); b++) {
            Termica.ImpressaoTexto(a.get(b), 0, 1, 0);
        }
    }

    private void imprimeImagem(String img){
        try {
            byte [] encodeByte = Base64.decode(img, Base64.DEFAULT);
            Bitmap bitmap = BitmapFactory.decodeByteArray(encodeByte, 0, encodeByte.length);
            Termica.ImprimeBitmap(bitmap);
        } catch(Exception e) {
            e.getMessage();
            return;
        }
    }
}
