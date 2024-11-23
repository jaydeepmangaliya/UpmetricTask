import {toast} from 'react-toastify'

export const successToast = (mess)=>{ 
    toast.success(mess,
        { 
            position:'top-right'
        }
    )
}
export const unsuccessToast = (mess)=>{ 
    toast.error(mess,
        { 
            position:'top-right'
        }
    )
}