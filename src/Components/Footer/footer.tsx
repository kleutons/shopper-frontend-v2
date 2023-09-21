import { FooterContainer } from "./style";
import NavMenu from "../NacMenu/navMenu";

export default function Footer(){
    return(
        <FooterContainer>
             <div className="container">
                <NavMenu />
                <div>
                    © 2023 - Made with 💙 by 
                    <a href="http://kleuton.dev" target="_blank" rel="noreferrer" >
                        @kleutons
                    </a>
                </div>
                <div>
                    * Por se tratar de um servidor backend gratuito e internacional, é possível que a primeira exibição da página leve mais tempo do que o habitual, o que não ocorre no ambiente localhost.
                </div>
             </div>
        </FooterContainer>
    )
}