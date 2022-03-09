import React = require('react');
import { FormEvent } from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { IPCFContext } from '../App';

interface AppState {
  currencyValue?: string;
}

export class TextFieldControl extends React.Component<IPCFContext, AppState> {
  constructor(props: IPCFContext) {
    super(props);
    initializeIcons();
    this.state = {
      currencyValue: this.props.defaultValue ? `€${parseFloat(this.props.defaultValue.toString()).toFixed(2)}` : undefined,
    };
  }

  render(): JSX.Element {
    return (
      <TextField
        inputClassName='euro_CurrencyField'
        placeholder='---'
        borderless={true}
        value={this.state.currencyValue}
        onChange={this.handleOnChange.bind(this)}
        onKeyPress={this.handleOnKeyPress.bind(this)}
        onBlur={this.handleOnChange.bind(this)}
      />
    );
  }

  private isValidChar(char: string) {
    const validArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

    if (validArr.indexOf(char) === -1) {
      return false;
    }

    return true;
  }

  private handleOnKeyPress(evt: React.KeyboardEvent) {
    const char = evt.key;

    if (!this.isValidChar(char)) {
      evt.preventDefault();
      return false;
    }

    return true;
  }

  private handleOnChange(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    let targetValue = e.currentTarget.value.replace(/€/g, '').trim().length !== 0 ? e.currentTarget.value.replace(/€/g, '').trim() : undefined;

    if (targetValue) {
      for (let c = 0; c < targetValue.length; c++) {
        if (!this.isValidChar(targetValue[c])) {
          targetValue = '0';
          break;
        }
      }
    }

    if (!targetValue) {
      targetValue = '0';
    }

    if (targetValue && targetValue.length === 0) {
      this.setState({ currencyValue: undefined });
      return;
    }

    if (e.type === 'blur') {
      this.setState({ currencyValue: targetValue ? `€${parseFloat(targetValue).toFixed(2)}` : undefined });
      const periods = targetValue ? targetValue.split('.') : undefined;
      if (periods && periods.length > 1) {
        targetValue = '';
        for (let i = 0; i < periods.length; i++) {
          targetValue += i === 0 ? `${periods[i]}.` : periods[i];
        }
      }

      this.props.handleValueChanged(targetValue ? Number(Number(targetValue).toFixed(4)) : undefined);
    } else {
      this.setState({ currencyValue: targetValue ? `${targetValue}` : undefined });
    }
  }
}
