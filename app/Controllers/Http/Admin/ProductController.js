'use strict'
const Database = use('Database')
const sanitize = use('sqlstring')

class ProductController {
  async index({view,request, response}){
    try {
      let allProducts= await Database.raw(`
        SELECT products.id,
products.title, products.sku,brands.title as brand,
concat(users.f_name, ' ' ,users.l_name) as user,
 products.material,products.qty, products.size, products.user_id,products.created_at
FROM products
INNER JOIN  brands
ON products.brand_id = brands.id
INNER JOIN  users
ON products.user_id = users.id
ORDER BY created_at ASC
        `)

        allProducts = allProducts[0]

        return view.render('admin/products/all',{allProducts})
    } catch (error) {
      console.log(error)
       return response.redirect('back') //`<h1 style="color: red">THERE WAS AN ERROR</h1><h3>${error.sqlMessage}</h3>`


    }

  }
   async store({request, response}){
     try {
       const post= request.post()
       await Database.raw(`
         INSERT INTO products(title,sku,material,description,brand_id,qty, size, user_id)
         values('${post.title}', '${post.sku}', '${post.material}','${post.description}', 1, '${post.qty}','${post.size}', 1)
         `)
         return response.redirect('/admin/products')
     } catch (error) {
       console.log(error)
        return response.redirect('back') //`<h1 style="color: red">THERE WAS AN ERROR</h1><h3>${error.sqlMessage}</h3>`


     }
  }
  create({view,request, response}){
    return view.render('admin/products/create')
  }
  show({view,request, response}){
    return view.render('admin/products/show')
  }
  edit({view,request, response}){
    return view.render('admin/products/edit')
  }
  update({request, response}){

  }
  delete({request, response}){

  }
}

module.exports = ProductController
