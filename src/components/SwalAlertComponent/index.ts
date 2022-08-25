import Swal from 'sweetalert2'

import { ISwallProps } from './interfaces'

export const SwalAlertComponent = ({ title, icon, text }: ISwallProps) => {

    return Swal.fire({
        icon: icon,
        text: text,
        title: title,
        showConfirmButton: false,
        timer: 5500,
        heightAuto: false,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
}