
type ParamsVenda = {
     idTransacao: number,
     pdv: string,
     valorTotal: number,
}

type ParamsVendaCredito = ParamsVenda & {
     tipoCartao: number,
     tipoFinanciamento: number,
     numParcelas: number | null,
}

type ParamsVendaDebito = ParamsVenda & {
     tipoCartao: number,
}

type ParamsCancelamento = {
     idTransacao: number,
     pdv: string,
     valorTotal: number,
     dataHora: string,
     nsu: string, 
}

type ParamsAdm = {
     idTransacao: number,
     pdv: string,
}

export type CommonResponse = {
    code: number;
    content: any;
    is_special_operation: boolean;
}

// Custom type guard function to check the type
function isParamsVendaCredito(obj: any): obj is ParamsVendaCredito {
  return 'tipoCartao' in obj && 'tipoFinanciamento' in obj;
}

function isParamsVendaDebito(obj: any): obj is ParamsVendaDebito {
  return 'tipoCartao' in obj;
}

export function processIniciarVenda(params: ParamsVenda | ParamsVendaCredito | ParamsVendaDebito) {
    let mensagem;

    if (isParamsVendaCredito(params)) {
        mensagem = "A implementar IniciarVendaCredito";
    } else if (isParamsVendaDebito(params)) {
        mensagem = "A implementar IniciarVendaDebito";
    } else {
        mensagem = "A implementar IniciarVenda"
    }

    return {
        code: 0,
        content: { mensagem },
        is_special_operation: false
    };
}

export function processIniciarCancelamentoVenda(params: ParamsCancelamento) {

    return {
        code: 0,
        content: { mensagem: "A implementar IniciarCancelamentoVenda" },
        is_special_operation: false
    };
}

export function processAdmMenu(params: ParamsAdm) {

    return {
        code: 0,
        content: { mensagem: "A implementar AdmMenu" },
        is_special_operation: false
    };
}

export function processAdmInstalacao(params: ParamsAdm) {

    return {
        code: 0,
        content: { mensagem: "A implementar AdmInstalacao" },
        is_special_operation: false
    };
}

export function processAdmConfiguracao(params: ParamsAdm) {

    return {
        code: 0,
        content: { mensagem: "A implementar AdmConfiguracao" },
        is_special_operation: false
    };
}

export function processAdmManutencao(params: ParamsAdm) {

    return {
        code: 0,
        content: { mensagem: "A implementar AdmManutencao" },
        is_special_operation: false
    };
}

export function processAdmTesteDeComunicacao(params: ParamsAdm) {

    return {
        code: 0,
        content: { mensagem: "A implementar AdmTesteDeComunicacao" },
        is_special_operation: false
    };
}

export function processAdmReimpressao(params: ParamsAdm) {

    return {
        code: 0,
        content: { mensagem: "A implementar AdmReimpressao" },
        is_special_operation: false
    };
}
