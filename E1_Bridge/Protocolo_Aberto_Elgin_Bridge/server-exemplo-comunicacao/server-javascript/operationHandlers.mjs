const CARTAO_CREDITO = 1;
const CARTAO_DEBITO = 2;

/**
 * @param {{
     idTransacao: number,
     pdv: string,
     valorTotal: number,
     tipoCartao: number | null,
     tipoFinanciamento: number | null,
     numParcelas: number | null,
 }} params
 */ 
export function processIniciarVenda(params) {
    let mensagem = "A implementar IniciarVenda";

    if (params.tipoCartao) {
        if (params.tipoCartao === CARTAO_CREDITO) {

            mensagem = "A implementar IniciarVendaCredito";
        } else if (params.tipoCartao === CARTAO_DEBITO) {
            mensagem = "A implementar IniciarVendaDebito";
        } else {
            mensagem = "Cartão inválido"
        }
    }

    return {
        code: 0,
        content: { mensagem },
        is_special_operation: false
    };
}

/**
 * @param {{
     idTransacao: number,
     pdv: string,
     valorTotal: number,
     dataHora: string,
     nsu: string, 
 }} params
 */ 
export function processIniciarCancelamentoVenda(params) {

    return {
        code: 0,
        content: { mensagem: "A implementar IniciarCancelamentoVenda" },
        is_special_operation: false
    };
}

/**
 * @param {{
     idTransacao: number,
     pdv: string,
 }} params
 */ 
export function processAdmMenu(params) {

    return {
        code: 0,
        content: { mensagem: "A implementar AdmMenu" },
        is_special_operation: false
    };
}

/**
 * @param {{
     idTransacao: number,
     pdv: string,
 }} params
 */ 
export function processAdmInstalacao(params) {

    return {
        code: 0,
        content: { mensagem: "A implementar AdmInstalacao" },
        is_special_operation: false
    };
}

/**
 * @param {{
     idTransacao: number,
     pdv: string,
 }} params
 */ 
export function processAdmConfiguracao(params) {

    return {
        code: 0,
        content: { mensagem: "A implementar AdmConfiguracao" },
        is_special_operation: false
    };
}

/**
 * @param {{
     idTransacao: number,
     pdv: string,
 }} params
 */ 
export function processAdmManutencao(params) {

    return {
        code: 0,
        content: { mensagem: "A implementar AdmManutencao" },
        is_special_operation: false
    };
}

/**
 * @param {{
     idTransacao: number,
     pdv: string,
 }} params
 */ 
export function processAdmTesteDeComunicacao(params) {

    return {
        code: 0,
        content: { mensagem: "A implementar AdmTesteDeComunicacao" },
        is_special_operation: false
    };
}

/**
 * @param {{
     idTransacao: number,
     pdv: string,
 }} params
 */ 
export function processAdmReimpressao(params) {

    return {
        code: 0,
        content: { mensagem: "A implementar AdmReimpressao" },
        is_special_operation: false
    };
}
