import { toast } from 'react-toastify';

class Toast {
  static info(message) {
    toast.info(message, {
      hideProgressBar: true,
    });
  }

  static warn(message) {
    message.warning(message, {
      hideProgressBar: true,
    });
  }

  static success(message) {
    message.success(message, {
      hideProgressBar: true,
    });
  }

  static error(message) {
    message.error(message, {
      hideProgressBar: true,
    });
  }
}

export default Toast;