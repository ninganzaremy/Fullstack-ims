'use strict'
const Database = use('Database')
const sanitize = use('sqlstring')

class BrandController {


  async index({view,request,response}){
    try {
      let allBrands= await Database.raw(`
        SELECT brands.id, brands.title, brands.img_url, brands.user_id,
        concat(users.f_name, ' ', users.l_name) as user,
        brands.created_at, brands.updated_at From brands
INNER JOIN  users
ON brands.user_id = users.id
ORDER BY created_at ASC
        `)

        allBrands = allBrands[0]

        return view.render('admin/brands/all',{allBrands})
    } catch (error) {
      console.log(error)
       return response.redirect('back')
    }

  }
   async store({request, response}){
     try {
       const post= request.post()
       await Database.raw(`
         INSERT INTO products(title,sku,img_url,material,description,brand_id,qty, size, user_id)
         values(
           ${sanitize.escape(post.title)},
           ${sanitize.escape(post.sku)},
           ${sanitize.escape(post.img_url)},
           ${sanitize.escape(post.material)},
           ${sanitize.escape(post.description)},
           ${parseInt(1)},
           ${sanitize.escape(post.qty)},
           ${sanitize.escape(post.size)},
           ${parseInt(1)})
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
  async show({view,request, response, params}){

    try {
      let product= await Database.raw(`
        SELECT products.id,
products.title, products.sku,products.img_url,products.description,brands.title as brand,
concat(users.f_name, ' ' ,users.l_name) as user,
 products.material,products.qty, products.size, products.user_id,products.created_at
FROM products
INNER JOIN  brands
ON products.brand_id = brands.id
INNER JOIN  users
ON products.user_id = users.id
WHERE products.id = ${params.id}
ORDER BY created_at ASC
LIMIT 1
        `)
        product = product[0][0]

        return view.render('admin/products/show',{product})
    } catch (error) {
      console.log(error)
       return response.redirect('back') //`<h1 style="color: red">THERE WAS AN ERROR</h1><h3>${error.sqlMessage}</h3>`


    }
  }
  async edit({view,request, response, params}){
    try {
      let product= await Database.raw(`
        SELECT products.id,
products.title, products.sku,products.img_url,products.description,brands.title as brand,
concat(users.f_name, ' ' ,users.l_name) as user,
 products.material,products.qty, products.size, products.user_id,products.created_at
FROM products
INNER JOIN  brands
ON products.brand_id = brands.id
INNER JOIN  users
ON products.user_id = users.id
WHERE products.id = ${params.id}
ORDER BY created_at ASC
LIMIT 1
        `)
        product = product[0][0]

        return view.render('admin/products/edit',{product})
    } catch (error) {
      console.log(error)
       return response.redirect('back') //`<h1 style="color: red">THERE WAS AN ERROR</h1><h3>${error.sqlMessage}</h3>`


    }
  }
  async update({request, response, params}){
    try {
      const id = params.id
      const post= request.post()
      await Database.raw(`
        UPDATE products
        SET
        title =  ${sanitize.escape(post.title)},
        sku =  ${sanitize.escape(post.sku)},
        img_url = ${sanitize.escape(post.img_url)},
        material =  ${sanitize.escape(post.material)},
        description =${sanitize.escape(post.description)},
        brand_id = ${parseInt(1)},
        qty = ${sanitize.escape(post.qty)},
        size =${sanitize.escape(post.size)},
        user_id = ${parseInt(1)}
        WHERE id =${id}
        `)
        return response.redirect(`/admin/products/${id}`)
    } catch (error) {
      console.log(error)
       return response.redirect('back') //`<h1 style="color: red">THERE WAS AN ERROR</h1><h3>${error.sqlMessage}</h3>`


    }

  }
   async delete({request, response, params}){
    try {
      const id = params.id
      await Database.raw(`
        DELETE FROM products
        WHERE id = ${id}
        `)
        return response.redirect(`/admin/products`)
    } catch (error) {
      console.log(error)
       return response.redirect('back') //`<h1 style="color: red">THERE WAS AN ERROR</h1><h3>${error.sqlMessage}</h3>`


    }

  }
}

module.exports = BrandController
