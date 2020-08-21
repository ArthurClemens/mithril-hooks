import m from 'mithril';
import { withHooks, useState } from 'mithril-hooks';

type TAttrs = {
  isOn?: boolean;
};

const ToggleFn = (attrs: TAttrs) => {
  const [isOn, setIsOn] = useState(attrs.isOn);

  return m('.toggle', [
    m(
      'button',
      {
        className: `button ${isOn ? 'is-info' : ''}`,
        onclick: () => setIsOn(current => !current),
      },
      'Toggle',
    ),
    m('.info', isOn ? 'On' : 'Off'),
  ]);
};

export const Toggle = withHooks<TAttrs>(ToggleFn);

export const ToggleWithPreset = {
  view: () => [m(Toggle, { isOn: true })],
};
