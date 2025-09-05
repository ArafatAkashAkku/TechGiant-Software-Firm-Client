import { toast, ToastOptions, Id } from 'react-toastify';

// Success toast
export const showSuccessToast = (message: string, options?: ToastOptions): Id => {
  return toast.success(message, options);
};

// Error toast
export const showErrorToast = (message: string, options?: ToastOptions): Id => {
  return toast.error(message, options);
};

// Loading toast (react-toastify doesn't have a built-in loading toast, so we'll use info with custom styling)
export const showLoadingToast = (message: string, options?: ToastOptions): Id => {
  return toast.info(message, options);
};

// Custom toast
export const showCustomToast = (message: string, options?: ToastOptions): Id => {
  return toast(message, options);
};

// Info toast
export const showInfoToast = (message: string, options?: ToastOptions): Id => {
  return toast.info(message, options);
};

// Warning toast
export const showWarningToast = (message: string, options?: ToastOptions): Id => {
  return toast.warn(message, options);
};

// Promise toast - useful for async operations
export const showPromiseToast = (
  promise: Promise<unknown>,
  messages: {
    pending: string;
    success: string;
    error: string;
  },
  options?: ToastOptions
): Promise<unknown> => {
  return toast.promise(promise, messages, options);
};

// Dismiss a specific toast
export const dismissToast = (toastId: Id): void => {
  toast.dismiss(toastId);
};

// Dismiss all toasts
export const dismissAllToasts = (): void => {
  toast.dismiss();
};

// Update a toast
export const updateToast = (toastId: Id, options: ToastOptions): void => {
  toast.update(toastId, options);
};

// Check if a toast is active
export const isToastActive = (toastId: Id): boolean => {
  return toast.isActive(toastId);
};

export default toast;
