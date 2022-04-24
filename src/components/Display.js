import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import If from './If';

const styles = StyleSheet.create({
  display: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  displayValue: {
    fontSize: 60,
    color: 'rgb(0,0,0)',
  },
  operation: {
    color: 'rgb(0,0,0)',
    fontSize: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default props => {
  const firstValue = props.firstValue ?? null;
  const secondValue = props.secondValue ?? null;
  const operator = props.operator ?? null;

  return (
    <SafeAreaView style={styles.display}>
      <View>
        <If value={firstValue}>
          <Text style={styles.operation}>
            {firstValue}
            <If value={operator}>
              {operator}
              <If value={secondValue}>{secondValue}</If>
            </If>
          </Text>
        </If>
      </View>
      <Text style={styles.displayValue} numberOfLines={1}>
        {props.value}
      </Text>
    </SafeAreaView>
  );
};
