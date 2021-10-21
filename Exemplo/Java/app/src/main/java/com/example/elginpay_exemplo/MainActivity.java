package com.example.elginpay_exemplo;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.widget.Button;
import android.widget.Toast;

import com.elgin.e1.Pagamento.ElginPay;

public class MainActivity extends AppCompatActivity {

    private Context mContext;

    ElginPay pagamento = new ElginPay();

    // Botões
    private Button buttonDebito, buttonCredito, buttonCancelamento, buttonAdministrativa;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mContext = this.getApplicationContext();

        buttonDebito = findViewById(R.id.buttonDebito);
        buttonCredito = findViewById(R.id.buttonCredito);
        buttonCancelamento = findViewById(R.id.buttonCancelamento);
        buttonAdministrativa = findViewById(R.id.buttonAdministrativa);

        buttonDebito.setOnClickListener((view)-> {funcaoDebito();});
        buttonCredito.setOnClickListener((view)-> {funcaoCredito();});
        buttonCancelamento.setOnClickListener((view)-> {funcaoCancelamento();});
        buttonAdministrativa.setOnClickListener((view)-> {funcaoAdministrativa();});
    }

    //Declaração da Classe Handler para receber a saida da transação.
    private Handler handler = new Handler(Looper.getMainLooper()){
        @Override
        public void handleMessage(@NonNull Message msg) {
            super.handleMessage(msg);
            String saida = (String) msg.obj;
            Toast.makeText(getApplicationContext(), saida, Toast.LENGTH_LONG).show();
        }
    };

    private void funcaoDebito(){

        Toast.makeText(getApplicationContext(), "Debito", Toast.LENGTH_LONG).show();
        pagamento.iniciarPagamentoDebito("1000",this,handler);
    }
    private void funcaoCredito(){

        Toast.makeText(getApplicationContext(),"Crédito", Toast.LENGTH_LONG).show();
        pagamento.inciarPagamentoCredito("1000",0,this,handler);
    }
    private void funcaoCancelamento(){

        Toast.makeText(getApplicationContext(),"Cancelamento", Toast.LENGTH_LONG).show();
        pagamento.iniciarCancelamentoVenda("1000",this,handler);
    }
    private void funcaoAdministrativa(){

        Toast.makeText(getApplicationContext(),"Administrativa", Toast.LENGTH_LONG).show();
        pagamento.iniciarOperacaoAdministrativa(this,handler);
    }
}