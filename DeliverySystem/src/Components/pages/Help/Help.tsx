import { PageTitle } from "../../PageTitle.tsx"
import { useBodyBackground } from "../../../Hooks/useBodyBackground.ts"
import { BACKGROUND_BOTTOM, IMAGE2 } from "../../../constants.ts"
import ChatBotContainer from '../../Chatbot/ChatBotContainer.jsx';

export default function Help() {
    useBodyBackground({ backgroundImage: IMAGE2, backgroundPosition: BACKGROUND_BOTTOM, backgroundSize: 'cover' })

    return(
        <>
            <PageTitle title="FAQ" />
            <ChatBotContainer />

        </>
    )
}