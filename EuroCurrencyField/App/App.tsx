import React = require('react');

import { TextFieldControl } from './Controls/TextFieldControl';

export interface IPCFContext {
  defaultValue?: number;
  handleValueChanged: (newValue: number|undefined) => void;
}

export class App extends React.Component<IPCFContext> {
  constructor(props: IPCFContext) {
    super(props);
  }

  render(): JSX.Element {
    return <TextFieldControl {...this.props} />;
  }
}
