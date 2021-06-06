import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {
  Container,
  Button,
  Text,
  Content,
  Header,
  Body,
  Card,
  H1,
  H3,
  Title,
  H2,
} from 'native-base';
import SnackBar from 'react-native-snackbar';
import Icons from './components/Icons';

const itemArray = Array(9).fill('empty');

const App = () => {
  const [isCross, setIsCross] = useState(true);
  const [winMsg, setWinMsg] = useState('');

  const changeItem = itemNumber => {
    // change the icon according to the itemNumber
    if (winMsg) {
      return SnackBar.show({
        text: winMsg,
        duration: SnackBar.LENGTH_LONG,
        backgroundColor: '#35BDD0',
        textColor: '##fff',
        textTransform: 'uppercase',
        textAlign: 'center',
        action: {
          text: 'OK',
          textColor: 'white',
          onPress: () => {
            SnackBar.dismiss();
          },
        },
      });
    }

    if (itemArray[itemNumber] === 'empty') {
      itemArray[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
      checkIsWinner();
    } else {
      return SnackBar.show({
        text: 'Already filled',
        duration: SnackBar.LENGTH_SHORT,
        backgroundColor: '#E6425E',
        textColor: '#fff',
        textAlign: 'center',
      });
    }
  };

  const reloadGame = () => {
    setIsCross(!isCross);
    setWinMsg('');
    itemArray.fill('empty');
    SnackBar.dismiss();
  };

  const checkIsWinner = () => {
    // checking the winner

    //row checking
    if (
      itemArray[0] !== 'empty' &&
      itemArray[0] === itemArray[1] &&
      itemArray[1] === itemArray[2]
    ) {
      setWinMsg(`${itemArray[0]} wins`);
    }
    if (
      itemArray[3] !== 'empty' &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ) {
      setWinMsg(`${itemArray[4]} wins`);
    }
    if (
      itemArray[6] !== 'empty' &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      setWinMsg(`${itemArray[6]} wins`);
    }

    // 0 1 2
    // 3 4 5
    // 6 7 8

    //column checking
    if (
      itemArray[0] !== 'empty' &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      setWinMsg(`${itemArray[0]} wins`);
    }

    if (
      itemArray[1] !== 'empty' &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      setWinMsg(`${itemArray[1]} wins`);
    }

    if (
      itemArray[2] !== 'empty' &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      setWinMsg(`${itemArray[2]} wins`);
    }

    // diagonal checking
    if (
      itemArray[0] !== 'empty' &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      setWinMsg(`${itemArray[0]} wins`);
    }
    if (
      itemArray[2] !== 'empty' &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      setWinMsg(`${itemArray[2]} wins`);
    }

    if (!itemArray.includes('empty')) {
      setWinMsg('Game draw !!!');
    }
  };
  return (
    <Container
      style={{
        backgroundColor: '#EDC126',
      }}>
      <Header>
        <Body>
          <Title>LCO TIC TAC TOE</Title>
        </Body>
      </Header>
      <Content>
        <View style={styles.grid}>
          {itemArray.map((item, index) => (
            <TouchableOpacity
              style={styles.box}
              key={index}
              onPress={() => {
                changeItem(index);
              }}>
              <Card style={styles.card}>
                <Icons iconName={item} />
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        {winMsg ? (
          <View
            style={{
              padding: 10,
            }}>
            <H1 style={styles.msg}>{winMsg}</H1>

            <Button onPress={reloadGame} primary rounded block>
              <H2 style={{color: '#fff'}}>Reload Game</H2>
            </Button>
          </View>
        ) : (
          <View style={{padding: 10}}>
            <H3
              style={{
                color: '#6A1B4D',
                textTransform: 'uppercase',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {isCross ? 'CROSS turn' : 'CIRCLE turn'}
            </H3>
          </View>
        )}
      </Content>
    </Container>
  );
};

export default App;

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    padding: 5,
  },
  box: {
    width: '33%',
    marginBottom: 7,
  },
  card: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 4,
    backgroundColor: '#F4CE6A',
  },
  msg: {
    fontSize: 30,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: 5,
    paddingVertical: 10,
    color: '#0D0D0D',
    marginBottom: 10,
  },
});
