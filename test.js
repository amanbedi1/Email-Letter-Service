function asyncFunction(x){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(`SUCCESS for ${x} inside function`);
        },3000);
    }) 
};

(async()=>{
for(let i=0;i<5;++i){
    let promises = [];
    console.log(`Value of ${i}`);
    for(let j=0;j<5;++j){
        promises.push(asyncFunction(i));
    } 

    const res = await Promise.all(promises);
    console.log(res);

}})();
