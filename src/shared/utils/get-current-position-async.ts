export async function getCurrentPositionAsync(options?: PositionOptions) {
  return new Promise((resolve: (pos: GeolocationPosition) => void, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        reject(error);
      },
      options,
    );
  });
}
