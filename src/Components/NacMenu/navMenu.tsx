
const menuMain = [
    {
        name: "Atualizar Preços",
        link: "/shopper-frontend-v2"
    },
    {
        name: "Exibir Produtos",
        link: "/shopper-frontend-v2/products"
    }
]

export default function NavMenu(){
    return(
        <nav>
            <ul>
                {menuMain.map(menu => {
                    return(
                            <li key={menu.name}>
                                <a href={menu.link}>{menu.name}</a>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}