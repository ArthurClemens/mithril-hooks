import m from "mithril";
import { withHooks, useState } from "mithril-hooks";

const Toggle = () => {
  const [clicked, setClicked] = useState(false);
  return m(".toggle", [
    m("button",
      {
        className: `button ${clicked ? "is-info" : ""}`,
        onclick: () => setClicked(!clicked)
      },
      "Toggle"
    ),
    m(".info", clicked ? "On" : "Off")
  ]);
};

export default withHooks(Toggle);
