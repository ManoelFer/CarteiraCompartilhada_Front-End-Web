import { SwalAlertComponent } from 'components'

export const handleErrosInContract = (error: string) => {
    if (error === "VM Exception while processing transaction: revert You can only withdraw your allowance once every 30 days") {
        return SwalAlertComponent({ icon: "error", title: 'Você só pode retirar Family Coins novamente daqui 30 dias!' })

    } else if (error === "VM Exception while processing transaction: revert ERC20Pausable: token transfer while paused") {
        return SwalAlertComponent({ icon: "error", title: 'Todas as transferências foram pausadas pelo administrador!' })

    } else if (error === "VM Exception while processing transaction: revert ERC20: transfer amount exceeds balance") {
        return SwalAlertComponent({ icon: "error", title: 'A quantidade que você está tentando retirar, ultrapassam a contida no contrato!' })
    }

    return SwalAlertComponent({ icon: "error", title: 'Falha nas transações de Family Coins!' })
}