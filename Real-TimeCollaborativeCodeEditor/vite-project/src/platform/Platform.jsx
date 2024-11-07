import AceEditor from "react-ace"
import { Toaster, toast } from "react-hot-toast"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import './Platform.css'

import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/mode-html"
import "ace-builds/src-noconflict/mode-css"
import "ace-builds/src-noconflict/keybinding-emacs"
import "ace-builds/src-noconflict/keybinding-vim"
import "ace-builds/src-noconflict/theme-monokai"
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/ext-searchbox"

export default function Platform({ socket }) {
  const navigate = useNavigate()
  const { platformId } = useParams()
  const languageAvailable = ["html", "css", "javascript", "python", "java"]
  const codekeyBindingsAvailable = ["default", "emacs", "vim"]
  const [language, setLanguage] = useState(() => "javascript")
  const [codekeyBinding, setCodekeyBinding] = useState(() => undefined)
  const [getuser, setGetuser] = useState(() => [])
  const [getcode, setGetcode] = useState(() => "")

  function onCodeChange(newValue) {
    setGetcode(newValue)
    socket.emit("update code", { platformId, code: newValue })
    socket.emit("syncing the code", { platformId })
  }

  function handleLanguageChange(e) {
    setLanguage(e.target.value)
    socket.emit("update language", { platformId, languageUsed: e.target.value })
    socket.emit("syncing the language", { platformId })
  }
  function handleCodekeyBindingChange(e) {
    setCodekeyBinding(e.target.value === "default" ? undefined : e.target.value)
  }
  function handleLeave() {
    socket.emit("leave platform",platformId,)
    socket.disconnect()
    !socket.connected && navigate('/', { replace: true, state: {} })
  }
  function generateUserColor(user) {
    let hash = 0;
    for (let i = 0; i < user.length; i++) {
      hash = user.charCodeAt(i) + ((hash << 5) - hash)
    }
    let color = "#";
    for (let index = 0; index < 3; index++) {
      let value = (hash >> (index * 8)) & 0xff;
      color += value.toString(16).padStart(2, '0')
    }
    return color
  }
  function copyToClipboard(text) {
    try {
      navigator.clipboard.writeText(text)
      toast.success("Room ID copied")
    } catch (exp) {
      console.error(exp)
    }
  }

  useEffect(() => {
    socket.on("updating client list", ({ userlist }) => {
      setGetuser(userlist)
    })
    socket.on("on language change", ({ languageUsed }) => {
      setLanguage(languageUsed)
    })
    socket.on("on code change", ({ code }) => {
      setGetcode(code)
    })
    socket.on("new member joined", ({ username }) => {
      toast(`${username} joined`)
    })
    socket.on("member left", ({ username }) => {
      toast(`${username} leaved`)
    })
    const backButtonEventListner = window.addEventListener("popstate", function (e) {
      const eventStateObj = e.state
      if (!('usr' in eventStateObj) || !('username' in eventStateObj.usr)) {
        socket.disconnect()
      }
    });
    return () => {
      window.removeEventListener("popstate", backButtonEventListner)
    }
  }, [socket])

  return (
    <div className="platform">
      <div className="platformsidebar">
        <div className="platformSidebarUsersWrapper">
          <div className="languageFieldWrapper">
            <select className="languageField" value={language} name="language" id="language"
              onChange={handleLanguageChange}>
              {
                languageAvailable.map(eachLanguage => (
                  <option key={eachLanguage} value={eachLanguage}>{eachLanguage}</option>
                ))
              }
            </select>
          </div>
          <div className="languageFieldWrapper">
            <select className="languageField" name="language" value={codekeyBinding} id="language"
              onChange={handleCodekeyBindingChange}>
              {
                codekeyBindingsAvailable.map(each => (
                  <option key={each} value={each}>{each}</option>
                ))
              }
            </select>
          </div>
          <p>Connected users:</p>
          <div className="platformSidebarUsers">
            {
              getuser.map((eachuser) => (
                <div key={eachuser} className="platformSidebarUsersEach">
                  <div className="userAvatar" style={{ backgroundColor: `${generateUserColor(eachuser)}` }}>{eachuser.slice(0, 2).toUpperCase()}</div>
                  <div className="userName">{eachuser}</div>
                </div>
              ))
            }
          </div>
          <button className="platformSidebarBtn platformSidebarCopyBtn"
            onClick={() => { copyToClipboard(platformId) }}>Copy Platform ID</button>
          <button className="platformSidebarBtn platformSidebarLeaveBtn" onClick={() => { handleLeave() }}>Leave Platform</button>
        </div>
      </div>
      <AceEditor placeholder="Write your code here" className="platformcodeEditor" theme="monokai"
        mode={language} name="collaborativeEditor" keyboardHandler={codekeyBinding} fontSize={18}
        value={getcode} onChange={onCodeChange} showPrintMargin={true} showGutter={true} highlightActiveLine={true}
        enableLiveAutocompletion={true} enableBasicAutocompletion={false} enableSnippets={false}
        wrapEnabled={true} tabSize={2} editorProps={{ $blockScrolling: true }} />
      <Toaster />
    </div>
  )
}