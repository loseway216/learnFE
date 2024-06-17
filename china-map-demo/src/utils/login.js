export default async function () {
  document.cookie = "SameSite=None; Secure=true"
  return fetch("/verifyProxy/verify/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username: "admin",
      password:// Nsfocus@124
        "6f48663f5f791c85a686e48a32f0ad7e75b34cc8a77aa860659fd919bffcd178c15b65f73c9a8ee08475c734b2716bcd23cf0a21dd2b70f20dc0dac49a52ff66728fa452f95a2d2c8c4e2b53a3037f7e87027f74",
      // "2dcee8cc6839c4d011ec262fd2fb4cf95a1223f4be76c543b6f61dc5c8c7e969878fe1289d5fbdd92abcaf674096b8e97871ec17733f15c86488a03adfe7b497860c4a01e5fc399b99208ee361b5cd1364cb18ca",
    }),
  });
}
