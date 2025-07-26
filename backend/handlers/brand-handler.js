const Brand = require ("./../db/brand");

async function getBrands() {
    let brand = await Brand.find();
    return brand.map((x)=>x.toObject());
}

async function getBrandbyId(id){
    let brand = await Brand.findById(id);
    return brand.toObject();
}

async function addBrand(model){
    let brand = new Brand({
        name : model.name,
    });
    await brand.save();
    return brand.toObject();
}

async function updateBrand(id,model){
    await Brand.findByIdAndUpdate(id,model);
}

async function deleteBrand(id){
    await Brand.findByIdAndDelete(id);
}

module.exports =  { getBrands,getBrandbyId,addBrand,updateBrand,deleteBrand };