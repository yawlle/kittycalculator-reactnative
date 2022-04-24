import React, {Component} from 'react';
import Button from './src/components/Button';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  ImageBackground,
} from 'react-native';
import Sound from 'react-native-sound';
import Display from './src/components/Display';

import KittySound1 from './src/sounds/0.mp3';
import catImage from './src/image/kittyDisplay.jpg';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class App extends Component {
  state = {...initialState};

  sound = new Sound('kitty1.mp3');
  sound2 = new Sound('kitty3.mp3');

  playSound = () => {
    this.sound.play();
  };

  addDigit = n => {
    const clearDisplay =
      this.state.displayValue === '0' || this.state.clearDisplay;

    if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')) {
      return;
    }

    const currentValue = clearDisplay ? '' : this.state.displayValue; //é vazio? se não, valor

    const displayValue = currentValue + n;
    this.setState({displayValue, clearDisplay: false});

    if (n !== '.') {
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values]; //copia
      values[this.state.current] = newValue;
      this.setState({values});
    }
  };

  clearMemory = () => {
    this.sound2.play();
    this.setState({...initialState});
  };

  setOperation = operation => {
    this.sound.play();

    if (this.state.current === 0) {
      this.setState({operation, current: 1, clearDisplay: true});
    } else {
      const equals = operation === '=';
      const values = [...this.state.values];
      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;

      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: true,
        values,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={catImage}
          resizeMode="cover"
          style={styles.image}>
          <Display
            value={this.state.displayValue}
            operator={this.state.operation}
            firstValue={this.state.values[0]}
            secondValue={this.state.values[1]}
          />
        </ImageBackground>
        <View style={styles.buttons}>
          <Button label="AC" triple onClick={this.clearMemory} />
          <Button label="/" operation onClick={() => this.setOperation('/')} />
          <Button label="7" onClick={this.addDigit} />
          <Button label="8" onClick={this.addDigit} />
          <Button label="9" onClick={this.addDigit} />
          <Button label="*" operation onClick={this.setOperation} />
          <Button label="4" onClick={this.addDigit} />
          <Button label="5" onClick={this.addDigit} />
          <Button label="6" onClick={this.addDigit} />
          <Button label="-" operation onClick={this.setOperation} />
          <Button label="1" onClick={this.addDigit} />
          <Button label="2" onClick={this.addDigit} />
          <Button label="3" onClick={this.addDigit} />
          <Button label="+" operation onClick={this.setOperation} />
          <Button label="0" double onClick={this.addDigit} />
          <Button label="." onClick={this.addDigit} />
          <Button label="=" operation onClick={this.setOperation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

// export default App;
