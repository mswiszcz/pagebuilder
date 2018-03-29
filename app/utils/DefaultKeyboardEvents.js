export default class DefaultKeyboardEvents {
  static call = (router, event) => {
    if (event.metaKey && event.ctrlKey) {
      switch (event.key) {
        case '1':
          router.push(`/editor`);
          return;
        case '2':
          router.push(`/preview`);
          return;
        case '4':
          router.push(`/packages`);
          return;
      }
    }
  }
}
