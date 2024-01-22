import axios from 'axios'

const check = () => {
  // console.log(navigator);
  if (!("serviceWorker" in navigator)) {
    // throw new Error("No Service Worker support!");
  }
  if (!("PushManager" in window)) {
    // throw new Error("No Push API Support!");
  }
};

const permissiondenied = async () => {
  // console.log("User denied permission");
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    // console.log(registrations);

    if (registrations) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.unregister();
        // console.log(registrations);
      });
    }
  });

  return;
};

const urlB64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const saveSubscription = async (subscription) => {
  const response = await axios("https://itworksonlocal.herokuapp.com/notification/subscribe", {
    method: "post",
    data:subscription,
  });
  return response.json();
};

const send = async () => {


  const swRegistration = await navigator.serviceWorker.register("service.js");
  try {
    const applicationServerKey = urlB64ToUint8Array(
      "BGAFZ9hQZDF4GhJ_NWZkZWbt3U8X6hzjp9Hm_rFig7DZTcaZFyNgLaHqV71_9OhkqC47PKGdnuWrqRjJ4pvPed8"
    );
    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await swRegistration.pushManager.subscribe(options);
    const response = await saveSubscription(subscription);
  } catch (err) {
    // console.log("Error", err);
  }
};

const requestNotificationPermission = async () => {


  if (Notification.permission === "granted") {
    send().catch((err) => console.error(err));
  } else if (Notification.permission === "denied") {
    await permissiondenied();
  } else {
    const permission = await window.Notification.requestPermission();

    if (permission === "granted") send().catch((err) => console.error(err));
    else if (permission === "denied") {
      await permissiondenied();
    }
  }
};

const Main = async () => {
  // check();
  await requestNotificationPermission();
};

export default Main;
