const Banner = require('../proxy/banner')
const Category = require('../proxy/category')
const Good = require('../proxy/good')

const prefixImageUrl = imageUrl => `http://localhost:8080${imageUrl}`

// 异步获取 categories
// 异步获取 cateogries 下的 goods

exports.index = async (req, res) => {
    const banners = Banner.getBanners()
    const categories = Category.list({ parent_id: 0 })
    const categoryList = Category.list({ parent_id: 0 })
        .then(categories => {
            const all = []
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i]
                const promise = Good.getByCategory(category.id)
                    .limit(6)
                    .then(goods => {
                        const goodsList = goods.map(good => {
                            good.list_pic_url = prefixImageUrl(good.list_pic_url)
                            return good
                        })

                        return {
                            name: category.name,
                            id: category.id,
                            goodsList: goodsList,
                        }
                    })
                all.push(promise)
            }
            
            return Promise.all(all)
        })

    Promise.all([banners, categories, categoryList])
        .then(([banners, categories, categoryList]) => {
            banners = banners.map(banner => {
                banner.image_url = prefixImageUrl(banner.image_url)
                return banner
            })
            categories = categories.map(category => {
                category.icon_url = prefixImageUrl(category.icon_url)
                return category
            })

            const result = {
                errno: 0,
                errmsg: '',
                data: {
                    banner: banners,
                    brandList: [
                        {
                            name: '居家',
                            id: 11,
                            goodsList: [
                                {
                                    id: 2,
                                    list_pic_url: '',
                                    name: '名字',
                                    retail_price: 23,
                                }
                            ]
                        }
                    ],
                    categoryList: categoryList,
                    channel: categories,
                    hotGoodsList: [],
                    newGoodsList: [],
                    topicList: [],
                }
            }
            res.send(result)
        })
}