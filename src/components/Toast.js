import { toast } from 'react-toastify';

class Toast {
  static info(message) {
    toast.info(message, {
      hideProgressBar: true,
    });
  }

  static warn(message) {
    toast.warn(message, {
      hideProgressBar: true,
    });
  }

  static success(message) {
    toast.success(message, {
      hideProgressBar: true,
    });
  }

  static error(message) {
    toast.error(message, {
      hideProgressBar: true,
    });
  }
}

export default Toast;