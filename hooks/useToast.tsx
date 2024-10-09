import toast from 'react-hot-toast';

const successToast = (msg: string) => {
  toast.success(msg, {
    duration: 3000,
    position: 'top-right',
  });
};

const errorToast = (msg: string) => {
  toast.error(msg, {
    duration: 3000,
    position: 'top-right',
  });
};

const loadingToast = (msg: string) => {
  toast.loading(msg, {
    duration: 3000,
    position: 'top-right',
  });
};

type ToastType = 'success' | 'error' | 'loading';

export const useToast = (type: ToastType) => {
  switch (type) {
    case 'success':
      return successToast;
    case 'error':
      return errorToast;
    case 'loading':
      return loadingToast;
    default:
      return () => {};
  }
};