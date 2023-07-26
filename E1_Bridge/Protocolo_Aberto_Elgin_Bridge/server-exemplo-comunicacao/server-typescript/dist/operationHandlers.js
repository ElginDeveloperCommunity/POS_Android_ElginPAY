"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processAdmReimpressao = exports.processAdmTesteDeComunicacao = exports.processAdmManutencao = exports.processAdmConfiguracao = exports.processAdmInstalacao = exports.processAdmMenu = exports.processIniciarCancelamentoVenda = exports.processIniciarVenda = void 0;
// Custom type guard function to check the type
function isParamsVendaCredito(obj) {
    return 'tipoCartao' in obj && 'tipoFinanciamento' in obj;
}
function isParamsVendaDebito(obj) {
    return 'tipoCartao' in obj;
}
function processIniciarVenda(params) {
    let mensagem;
    if (isParamsVendaCredito(params)) {
        mensagem = "A implementar IniciarVendaCredito";
    }
    else if (isParamsVendaDebito(params)) {
        mensagem = "A implementar IniciarVendaDebito";
    }
    else {
        mensagem = "A implementar IniciarVenda";
    }
    return {
        code: 0,
        content: { mensagem },
        is_special_operation: false
    };
}
exports.processIniciarVenda = processIniciarVenda;
function processIniciarCancelamentoVenda(params) {
    return {
        code: 0,
        content: { mensagem: "A implementar IniciarCancelamentoVenda" },
        is_special_operation: false
    };
}
exports.processIniciarCancelamentoVenda = processIniciarCancelamentoVenda;
function processAdmMenu(params) {
    return {
        code: 0,
        content: { mensagem: "A implementar AdmMenu" },
        is_special_operation: false
    };
}
exports.processAdmMenu = processAdmMenu;
function processAdmInstalacao(params) {
    return {
        code: 0,
        content: { mensagem: "A implementar AdmInstalacao" },
        is_special_operation: false
    };
}
exports.processAdmInstalacao = processAdmInstalacao;
function processAdmConfiguracao(params) {
    return {
        code: 0,
        content: { mensagem: "A implementar AdmConfiguracao" },
        is_special_operation: false
    };
}
exports.processAdmConfiguracao = processAdmConfiguracao;
function processAdmManutencao(params) {
    return {
        code: 0,
        content: { mensagem: "A implementar AdmManutencao" },
        is_special_operation: false
    };
}
exports.processAdmManutencao = processAdmManutencao;
function processAdmTesteDeComunicacao(params) {
    return {
        code: 0,
        content: { mensagem: "A implementar AdmTesteDeComunicacao" },
        is_special_operation: false
    };
}
exports.processAdmTesteDeComunicacao = processAdmTesteDeComunicacao;
function processAdmReimpressao(params) {
    return {
        code: 0,
        content: { mensagem: "A implementar AdmReimpressao" },
        is_special_operation: false
    };
}
exports.processAdmReimpressao = processAdmReimpressao;
//# sourceMappingURL=operationHandlers.js.map