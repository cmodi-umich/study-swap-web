// eslint-disable-next-line
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  Fragment,
} from "react";
import { UserContext } from "../constants/UserContext";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import ChatSelect from "../components/ChatSelector";
import MessageBox from "../components/MessageBox";
import ChatsToolbar from "../components/ChatsToolbar";
import ChatsToolbar2 from "../components/ChatsToolbar2";
import WriteMessage from "../components/WriteMessage";

import { chatsModel, messageModel } from "../constants/Models";
import { addMessages, watchChats } from "../utils/firebaseUtils";
import { useAuthEffect } from "../hooks/useAuthEffect";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    backgroundColor: theme.palette.background.paper,
    height: 450,
  },
  rootChat: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    //maxHeight: 355,
    overflow: "auto",
  },

  inline: {
    display: "inline",
  },
  topbarLeft: {
    height: 50,
    //backgroundColor: "red", //change to theme
    alignItems: "center",
    justifyContent: "flex-end",
  },

  topbarRight: {
    height: 50,
    backgroundColor: "#f0f0f0", //change to theme
    alignItems: "center",
    justifyContent: "space-between",
  },

  newChatModal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  leftSide: {
    backgroundColor: "#f0f0f0",
  },

  list: {
    height: "100%",
    width: "100%",
    overflow: "auto",
  },
}));

function InputGrid({ height, setHeight, currentChat }: any) {
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const listen = () => {
      if (ref !== null) {
        if (ref.current) {
          if (ref.current.getBoundingClientRect().height !== height) {
            setHeight(ref.current.getBoundingClientRect().height);
          }
        }
      }
    };

    window.addEventListener("keyup", listen, { capture: true });
    return () => {
      window.removeEventListener("keyup", listen);
    };
  }, []);

  return (
    <Grid item style={{ minHeight: 45, backgroundColor: "#f0f0f0" }} ref={ref}>
      <WriteMessage
        chatId={currentChat.id}
        submitMessage={(message: messageModel) => {
          addMessages(message);
        }}
      />
    </Grid>
  );
}

export default function Chats() {
  // Context
  const { user, setUser } = useContext(UserContext);
  const [myChats, setMyChats] = useState<chatsModel[]>([]);
  const classes = useStyles();
  const [currentChat, setCurrentChat] = useState<chatsModel>({
    id: "",
    chatName: "",
    memberNames: [],
    members: [],
    messages: [],
    isGroup: false,
  });

  const [divHeight, setHeight] = useState<number>(45);

  const onClick = (chat: chatsModel) => {
    setCurrentChat(chat);
  };

  useAuthEffect(() => {
    if (user.id === "") return;
    let combinedName = user.firstName + " " + user.lastName;
    const unsubscribe = watchChats(user.id, combinedName, setMyChats); // userId is hardcoded for now

    return () => unsubscribe();
  }, [user.id]);

  useEffect(() => {
    if (myChats.length > 0 && !currentChat.id) {
      setCurrentChat(myChats[0]);
    }
  }, [myChats]);

  return (
    <Container component="main" maxWidth="md">
      <div style={{ justifyContent: "center", display: "flex" }}>
        <Grid container className={classes.root}>
          {" "}
          {/*top level horizontal grid*/}
          <Grid
            container
            sm={4}
            item
            direction="column"
            className={classes.leftSide}
          >
            {" "}
            {/*left side of view*/}
            <Grid item container className={classes.topbarLeft}>
              <Grid item>
                <ChatsToolbar />
              </Grid>
            </Grid>
            <Divider />
            <Grid item style={{ height: 375 }}>
              {" "}
              {/*Grid item to hold <List> of <chatSelect> listItems*/}
              <List className={classes.list}>
                {myChats.map((thisChatSelector) => (
                  <Fragment key={thisChatSelector.id}>
                    <ChatSelect
                      id={thisChatSelector.id}
                      chatName={thisChatSelector.chatName}
                      memberNames={thisChatSelector.memberNames}
                      messages={thisChatSelector.messages}
                      onClick={onClick}
                      lastMessageTimestamp={
                        thisChatSelector.lastMessageTimestamp
                      }
                      picture={thisChatSelector.chatPicture}
                      isGroup={thisChatSelector.isGroup}
                    />
                  </Fragment>
                ))}
              </List>
            </Grid>
          </Grid>
          <Grid container sm={8} item direction="column">
            {" "}
            {/*right side of view*/}
            <Grid item container className={classes.topbarRight}>
              <ChatsToolbar2 currentChat={currentChat} />
            </Grid>
            <Divider />
            <div style={{ maxHeight: 395 }}>
              <Grid // all the messages rendered in this at Grid items in MessageBox
                item
                container
                className={classes.rootChat}
                style={{ height: 395 - divHeight }}
                direction="row"
                alignContent="flex-start"
                spacing={0}
              >
                <MessageBox chatId={currentChat.id ? currentChat.id : ""} />
              </Grid>
              <Divider />
              <InputGrid
                setHeight={setHeight}
                currentChat={currentChat}
                height={divHeight}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
