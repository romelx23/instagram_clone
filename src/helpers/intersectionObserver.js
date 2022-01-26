export const intersectionObserver=(target)=>{
    console.log(target);
    const options = {
        root: document.querySelector("#scrollArea"),
        rootMargin: "0px",
        threshold: .5,
      };
      const nextPublication = () => {
        console.log("siguiente");
      };
      if(target){
          const observer = new IntersectionObserver(nextPublication, options);
            observer.observe(target);
      }
}