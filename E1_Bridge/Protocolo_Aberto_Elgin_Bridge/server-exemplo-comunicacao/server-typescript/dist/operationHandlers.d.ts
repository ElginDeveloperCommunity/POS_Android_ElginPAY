type ParamsVenda = {
    idTransacao: number;
    pdv: string;
    valorTotal: number;
};
type ParamsVendaCredito = ParamsVenda & {
    tipoCartao: number;
    tipoFinanciamento: number;
    numParcelas: number | null;
};
type ParamsVendaDebito = ParamsVenda & {
    tipoCartao: number;
};
type ParamsCancelamento = {
    idTransacao: number;
    pdv: string;
    valorTotal: number;
    dataHora: string;
    nsu: string;
};
type ParamsAdm = {
    idTransacao: number;
    pdv: string;
};
export type CommonResponse = {
    code: number;
    content: any;
    is_special_operation: boolean;
};
export declare function processIniciarVenda(params: ParamsVenda | ParamsVendaCredito | ParamsVendaDebito): {
    code: number;
    content: {
        mensagem: string;
    };
    is_special_operation: boolean;
};
export declare function processIniciarCancelamentoVenda(params: ParamsCancelamento): {
    code: number;
    content: {
        mensagem: string;
    };
    is_special_operation: boolean;
};
export declare function processAdmMenu(params: ParamsAdm): {
    code: number;
    content: {
        mensagem: string;
    };
    is_special_operation: boolean;
};
export declare function processAdmInstalacao(params: ParamsAdm): {
    code: number;
    content: {
        mensagem: string;
    };
    is_special_operation: boolean;
};
export declare function processAdmConfiguracao(params: ParamsAdm): {
    code: number;
    content: {
        mensagem: string;
    };
    is_special_operation: boolean;
};
export declare function processAdmManutencao(params: ParamsAdm): {
    code: number;
    content: {
        mensagem: string;
    };
    is_special_operation: boolean;
};
export declare function processAdmTesteDeComunicacao(params: ParamsAdm): {
    code: number;
    content: {
        mensagem: string;
    };
    is_special_operation: boolean;
};
export declare function processAdmReimpressao(params: ParamsAdm): {
    code: number;
    content: {
        mensagem: string;
    };
    is_special_operation: boolean;
};
export {};
//# sourceMappingURL=operationHandlers.d.ts.map