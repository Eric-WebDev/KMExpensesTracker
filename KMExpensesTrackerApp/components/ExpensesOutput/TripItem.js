import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';

function TripItem ({id,name, title,jobNo,submissionDate,status}){
    return(
<View style={styles.tripItem}>
    <View>
        <Text style={[styles.textBase, styles.name]}>
            {name}
        </Text>
        <Text style={[styles.textBase, styles.title]}>{title}</Text>
    </View>
    <View style={style.statusContainer}>
        <Text style={[styles.textBase,styles.submissionDate]}>{submissionDate}</Text>
        <Text style={[styles.textBase, styles.status]}>{status}</Text>
    </View>

</View>
    );
}


const styles = StyleSheet.create({
    pressed: {
      opacity: 0.75,
    },
    tripItem: {
      padding: 12,
      marginVertical: 8,
      backgroundColor: GlobalStyles.colors.primary500,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 6,
      elevation: 3,
      shadowColor: GlobalStyles.colors.gray500,
      shadowRadius: 4,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.4,
    },
    textBase: {
      color: GlobalStyles.colors.primary50,
    },
    name: {
      fontSize: 16,
      marginBottom: 4,
      fontWeight: 'bold',
    },
    title: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
      },
    statusContainer: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      minWidth: 80,
    },
    status: {
      color: GlobalStyles.colors.primary500,
      fontWeight: 'bold',
    },
  });

  export default TripItem;