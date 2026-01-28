import { usePrivateChatStore } from "../store";

const OpenUserInterface = () => {
    const openPrivateChat = usePrivateChatStore(
        (state) => state.openPrivateChat
    );

    return (
        {/* später machen */}
    );
};

export default OpenUserInterface;
