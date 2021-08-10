package com.elgin.utilityelginpay;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.elgin.utilityelginpay.Controller.ElginPAY;

import java.util.Random;

import br.com.setis.interfaceautomacao.Confirmacoes;
import br.com.setis.interfaceautomacao.EntradaTransacao;
import br.com.setis.interfaceautomacao.Operacoes;
import br.com.setis.interfaceautomacao.SaidaTransacao;
import br.com.setis.interfaceautomacao.StatusTransacao;
import br.com.setis.interfaceautomacao.Transacoes;

public class MainActivity extends AppCompatActivity {
    private Button btnVendaDebito,
            btnVendaCredito,
            btnCancelamento,
            btnTransacaoPendente,
            btnReimpressao,
            btnADM,
            btnADMInstall,
            btnADMManutencao,
            btnADMConfiguracao;

    ElginPAY elginPAY;
    private EntradaTransacao entradaTransacao;
    private Confirmacoes confirmacoes;
    private SaidaTransacao saidaTransacao;
    private Transacoes transacoes;
    private Random r = new Random();

    private Handler handler = new Handler(Looper.getMainLooper()){
        @Override
        public void handleMessage(@NonNull Message msg) {
            super.handleMessage(msg);
            SaidaTransacao s =(SaidaTransacao) msg.obj;
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnVendaDebito = findViewById(R.id.btnVendaDebito);
        btnVendaCredito = findViewById(R.id.btnVendaCredito);
        btnCancelamento = findViewById(R.id.btnCancelamento);
        btnTransacaoPendente = findViewById(R.id.btnTransacaoPendente);
        btnReimpressao = findViewById(R.id.btnReimpressao);
        btnADM = findViewById(R.id.btnADM);
        btnADMInstall = findViewById(R.id.btnADMInstall);
        btnADMManutencao = findViewById(R.id.btnADMManutencao);
        btnADMConfiguracao = findViewById(R.id.btnADMConfiguracao);

        btnVendaDebito.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                testeVenda();
            }
        });

        btnVendaCredito.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                testeVenda();
            }
        });

        btnCancelamento.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                testeCancelamento();
            }
        });
        btnTransacaoPendente.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                testeTransacaoPendente();
            }
        });

        btnReimpressao.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                testeReimpressao();
            }
        });

        btnADM.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                testeADM();
            }
        });

        btnADMInstall.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                testeADMInstall();
            }
        });

        btnADMManutencao.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                testeADMManutencao();
            }
        });

        btnADMConfiguracao.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                testeADMConfiguracao();
            }
        });

    }

    private void testeVenda(){
        initElginPay(Operacoes.VENDA);
    }

    private void testeCancelamento(){
        initElginPay(Operacoes.CANCELAMENTO);
    }

    private void testeTransacaoPendente(){
        entradaTransacao  = new EntradaTransacao(Operacoes.VENDA, String.valueOf(r.nextInt(999999)));

        TesteTransacaoPendente testeTransacaoPendente = new TesteTransacaoPendente();
        testeTransacaoPendente.execute(entradaTransacao);

    }

    private void testeReimpressao(){
        initElginPay(Operacoes.REIMPRESSAO);
    }

    private void testeADM(){
        initElginPay(Operacoes.ADMINISTRATIVA);
    }

    private void testeADMInstall(){
        initElginPay(Operacoes.INSTALACAO);
    }

    private void testeADMManutencao(){
        initElginPay(Operacoes.MANUTENCAO);
    }

    private void testeADMConfiguracao(){
        initElginPay(Operacoes.CONFIGURACAO);
    }

    private void testeADMTesteComunicacao(){
        initElginPay(Operacoes.TESTE_COMUNICACAO);
    }

    private void initElginPay(Operacoes operacoes){
        entradaTransacao = new EntradaTransacao(operacoes, String.valueOf(r.nextInt(999999)));
        elginPAY = new ElginPAY(entradaTransacao, handler, this);
        elginPAY.start();
    }

    class TesteTransacaoPendente extends AsyncTask<EntradaTransacao, Integer, SaidaTransacao>{

        @Override
        protected SaidaTransacao doInBackground(EntradaTransacao... entradaTransacaos) {
            SaidaTransacao saidaTransacao = new SaidaTransacao();
            try{
                ElginPAY elginPAY = new ElginPAY();
                transacoes = Transacoes.obtemInstancia(elginPAY.obtemDadosAutomacao(), getApplicationContext());
                saidaTransacao = transacoes.realizaTransacao(entradaTransacaos[0]);
            }catch(Exception e){
                e.printStackTrace();
            }finally {
                return saidaTransacao;
            }
        }

        @Override
        protected void onPostExecute(SaidaTransacao msaidaTransacao) {
            super.onPostExecute(msaidaTransacao);
            saidaTransacao = msaidaTransacao;

            if(saidaTransacao.existeTransacaoPendente()){
                AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
                builder.setTitle("Resultado da Venda!");
                builder.setMessage(saidaTransacao.obtemMensagemResultado() + "\n\nDeseja confirmar a transação?");
                confirmacoes = new Confirmacoes();
                builder.setPositiveButton("Confirmar", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        confirmacoes.informaIdentificadorConfirmacaoTransacao(saidaTransacao.obtemIdentificadorConfirmacaoTransacao());
                        confirmacoes.informaStatusTransacao(StatusTransacao.CONFIRMADO_AUTOMATICO);
                        transacoes.resolvePendencia(saidaTransacao.obtemDadosTransacaoPendente(), confirmacoes);
                    }
                });
                builder.setNegativeButton("Desfazer", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        confirmacoes.informaIdentificadorConfirmacaoTransacao(saidaTransacao.obtemIdentificadorConfirmacaoTransacao());
                        confirmacoes.informaStatusTransacao(StatusTransacao.DESFEITO_MANUAL);
                        transacoes.resolvePendencia(saidaTransacao.obtemDadosTransacaoPendente(), confirmacoes);
                    }
                });

                builder.setNeutralButton("Cancelar", null);

                AlertDialog alertDialog = builder.create();
                alertDialog.show();
            }else{
                AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
                builder.setTitle("Resultado da Venda!");
                builder.setMessage(saidaTransacao.obtemMensagemResultado());

                AlertDialog alertDialog = builder.create();
                alertDialog.show();
            }
        }
    }
}
