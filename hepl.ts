export const help = (obj: any) => {
  if (obj.name) {
    console.log(obj.name);
  } else console.log("no name");
};
