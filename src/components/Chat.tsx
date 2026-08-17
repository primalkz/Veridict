import Sidebar from "./Sidebar"
import "../css/chat.css"
import { ArrowUp } from "@phosphor-icons/react";

export default function Chat({isOpen, setIsOpen}) {
    return (
        <>
        <main className={isOpen ? "chatScreen" : "chatScreen sidebar-collapsed"}>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <section className="chatContent">
            {/* <h2>
                Debate with evidence!
            </h2> */}
            <section className="messaging">
                <article className="prompt">
                    How are you?
                </article>
                <article className="reply">
                    asbbd as dbasub doasdasdasdasd
                    asidjasidjas dcjdjs  jsid is  nidjd djcd 
                </article>
                <article className="prompt">
                    WHAT ARE you?
                </article>
                <article className="reply">
                    asbbd as dbasub doasdasdasdasd
                    asidjasidjas aksodasd aksodkasodkaos 
                    asidja oasjodjaj iji jiasjidj in naisdjieh nin cas iasnci j  nin cdjcd 
                    ansdnann ji djijc scij jicjidc  jijjj dcjdjs  jsid is  nidjd djcd
                    asbbd as dbasub doasdasdasdasd
                    asidjasidjas aksodasd aksodkasodkaos 
                    asidja oasjodjaj iji jiasjidj in naisdjieh nin cas iasnci j  nin cdjcd 
                    ansdnann ji djijc scij jicjidc  jijjj dcjdjs  jsid is  nidjd djcdasbbd as dbasub doasdasdasdasd
                    asidjasidjas aksodasd aksodkasodkaos 
                    asidja oasjodjaj iji jiasjidj in naisdjieh nin cas iasnci j  nin cdjcd 
                    ansdnann ji djijc scij jicjidc  jijjj dcjdjs  jsid is  nidjd djcdasbbd as dbasub doasdasdasdasd
                    asidjasidjas aksodasd aksodkasodkaos 
                    asidja oasjodjaj iji jiasjidj in naisdjieh nin cas iasnci j  nin cdjcd 
                    ansdnann ji djijc scij jicjidc  jijjj dcjdjs  jsid is  nidjd djcdasbbd as dbasub doasdasdasdasd
                    asidjasidjas aksodasd aksodkasodkaos 
                    asidja oasjodjaj iji jiasjidj in naisdjieh nin cas iasnci j  nin cdjcd 
                    ansdnann ji djijc scij jicjidc  jijjj dcjdjs  jsid is  nidjd djcdasbbd as dbasub doasdasdasdasd
                    asidjasidjas aksodasd aksodkasodkaos 
                    asidja oasjodjaj iji jiasjidj in naisdjieh nin cas iasnci j  nin cdjcd 
                    ansdnann ji djijc scij jicjidc  jijjj dcjdjs  jsid is  nidjd djcdasbbd as dbasub doasdasdasdasd
                    asidjasidjas aksodasd aksodkasodkaos 
                    asidja oasjodjaj iji jiasjidj in naisdjieh nin cas iasnci j  nin cdjcd 
                    ansdnann ji djijc scij jicjidc  jijjj dcjdjs  jsid is  nidjd djcdasbbd as dbasub doasdasdasdasd
                    asidjasidjas aksodasd aksodkasodkaos 
                    asidja oasjodjaj iji jiasjidj in naisdjieh nin cas iasnci j  nin cdjcd 
                    ansdnann ji djijc scij jicjidc  jijjj dcjdjs  jsid is  nidjd djcd 
                </article>
                <article className="prompt">
                    WHAT IS UP?WHAT IS UP?WHAT IS UP?WHAT IS UP?
                </article>
                <article className="reply">
                    asbbd as dbasub doasdasdasdasd
                    asidjasidjas aksodasd aksodkasodkaos 
                    asidja oasjodjaj iji jiasjidj in naisdjieh nin cas iasnci j  nin cdjcd 
                    ansdnann ji djijc scij jicjidc  jijjj dcjdjs  jsid is  nidjd djcd
                    asbbd as dbasub doasdasdasdasd
                    asidjasidjas aksodasd aksodkasodkaos 
                    asidja oasjodjaj iji jiasjidj in naisdjieh nin cas iasnci j  nin cdjcd 
                    ansdnann ji djijc scij jicjidc  jijjj dcjdjs  jsid is  nidjd djcdasbbd as dbasub doasdasdasdasd
                    asidjasidjas aksodasd aksodkasodkaos 
                    asidja oasjodjaj iji jiasjidj in naisdjieh nin cas iasnci j  nin cdjcd 
                    ansdnann ji djijc scij jicjidc  jijjj dcjdjs  jsid is  nidjd djcdasbbd as dbasub doasdasdasdasd
                    asidjasidjas aksodasd aksodkasodkaos 
                    asidja oasjodjaj iji jiasjidj in naisdjieh nin cas iasnci j  nin cdjcd 
                    ansdnann ji djijc scij jicjidc  jijjj dcjdjs  jsid is  nidjd djcdasbbd as dbasub doasdasdasdasd
                    asidjasidjas aksodasd aksodkasodkaos 
                    asidja oasjodjaj iji jiasjidj in naisdjieh nin cas iasnci j  nin cdjcd 
                    ansdnann ji djijc scij jicjidc  jijjj dcjdjs  jsid is  nidjd djcdasbbd as dbasub doasdasdasdasd
                    asidjasidjas aksodasd aksodkasodkaos 
                    asidja oasjodjaj iji jiasjidj in naisdjieh nin cas iasnci j  nin cdjcd 
                    ansdnann ji djijc scij jicjidc  jijjj dcjdjs  jsid is  nidjd djcdasbbd as dbasub doasdasdasdasd
                    asidjasidjas aksodasd aksodkasodkaos 
                    asidja oasjodjaj iji jiasjidj in naisdjieh nin cas iasnci j  nin cdjcd 
                    ansdnann ji djijc scij jicjidc  jijjj dcjdjs  jsid is  nidjd djcdasbbd as dbasub doasdasdasdasd
                    asidjasidjas aksodasd aksodkasodkaos 
                    asidja oasjodjaj iji jiasjidj in naisdjieh nin cas iasnci j  nin cdjcd 
                    ansdnann ji djijc scij jicjidc  jijjj dcjdjs  jsid is  nidjd djcd 
                </article>
            </section>
            <form className="inputBox">
                <input type="text" placeholder="Start Typing!"/>
                <button type="submit"><ArrowUp size={20} weight="regular" /></button>
            </form>
        </section>
        </main>
        </>
    )
}