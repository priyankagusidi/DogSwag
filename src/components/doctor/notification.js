function NotificationRequest() {
  const handleNotificationPermission = () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support Web Notifications.');
    } else if (Notification.permission === 'granted') {
      console.log('You already have permission to send notifications.');
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('You now have permission to send notifications.');
        }
      });
    }
  };

  return (
    <div>
      <button onClick={handleNotificationPermission}>
        Allow Notifications
      </button>
    </div>
  );
}

export default NotificationRequest;
