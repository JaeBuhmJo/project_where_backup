function toast_alert(str, time){
  const Toast = Swal.mixin({
    toast: true,
    position: 'center-center',
    showConfirmButton: false,
    timer: time,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.querySelector('.swal2-title').style.textAlign = 'center';
    }
  })
  Toast.fire({
    icon: null,
    title: str
  })
}