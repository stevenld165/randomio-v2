import type { ToastServiceMethods } from "primevue"

class ToastManager {
  showToast = (
    toast: ToastServiceMethods,
    severity: string,
    summary: string,
    detail?: string,
    life: number = 3000,
  ) => {
    toast.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: life,
    })
  }
}

export default new ToastManager()
