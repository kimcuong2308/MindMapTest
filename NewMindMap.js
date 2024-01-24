import React, { useRef, useState } from 'react';
import { Animated, View, StyleSheet, PanResponder, Text, TextInput } from 'react-native';
import { Svg, Line, Path } from 'react-native-svg';
const MindMap = () => {
  const node1 = useRef(new Animated.ValueXY()).current;
  const node2 = useRef(new Animated.ValueXY()).current;
  const [linePath, setLinePath] = useState('M0 0 L0 0');

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        node1.setOffset({
          x: node1.x._value,
          y: node1.y._value
        })
      },
      onPanResponderMove: (e, gestureState) => {
        node1.x.setValue(gestureState.dx);
        node1.y.setValue(gestureState.dy);
        // updateLinePath();
      },
      //onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}],{ useNativeDriver: false }, { listener: () => {console.log('test2'); updateLinePath();} }),
      onPanResponderRelease: () => {
        // node1.extractOffset();
        console.log("BEFORE");
        console.log(node1.x)
        node1.flattenOffset();
        console.log("AFTER");
        console.log(node1.x);
        updateLinePath();
      },
    }),
  ).current;
  const panResponder2 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        node2.setOffset({
          x: node2.x._value,
          y: node2.y._value
        })
      },
      onPanResponderMove: (e, gestureState) => {
        node2.x.setValue(gestureState.dx);
        node2.y.setValue(gestureState.dy);
      },
      //onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}],{ useNativeDriver: false }, { listener: () => {console.log('test2'); updateLinePath();} }),
      onPanResponderRelease: () => {
        node2.flattenOffset();
        // node2.extractOffset();
        updateLinePath();
      },
    }),
  ).current;
  const updateLinePath = () => {
    console.log('test');
    console.log("node1 x= " + node1.x._value);
    console.log("node1 y= " + node1.y._value);
    console.log("node2 x= " + node2.x._value);
    console.log("node2 y= " + node2.y._value);
    const x1 = node1.x._value + 25; // Assuming nodes are 50x50, adjust as needed
    const y1 = node1.y._value + 25;
    const x2 = node2.x._value + 25;
    const y2 = node2.y._value + 25;

    const path = `M${x1} ${y1} L${x2} ${y2}`;
    setLinePath(path);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Drag this box!</Text>
      <Animated.View
        style={{
          transform: [{ translateX: node1.x }, { translateY: node1.y }],
          zIndex: 2,
        }}
        {...panResponder.panHandlers}>
        <View style={styles.node}>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          transform: [{ translateX: node2.x }, { translateY: node2.y }],
          zIndex: 2,
        }}
        {...panResponder2.panHandlers}>
        <View style={styles.node} >
        </View>
      </Animated.View>
      <Svg height="100%" width="100%" style={styles.connector}>
        <Path x1="0" y1="0" x2="0" y2="0" stroke="black" strokeWidth="2" d={linePath} />
      </Svg>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  node: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    // borderRadius: 25,
    position: 'absolute',
  },
  input: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'gray',
  },
  connector: {
    position: 'absolute',
    zIndex: 1,
  },
});

export default MindMap;