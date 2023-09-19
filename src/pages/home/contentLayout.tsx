import _ from 'lodash';
import React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { DpSchema, TYFlatList } from 'tuya-panel-kit';
import { useSelector } from '@models';
import DpItemView from './dpItemView';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const ContentLayout: React.FC<Props> = props => {
  const { style } = props;
  /**
   *  
   * "switch_led":true,
    "work_mode":"white",
    "bright_value":15,
    "temp_value":0,
    "colour_data":"看看",
    "scene_data":"鹿角胶",
    "countdown":1,
    "control_data":""
   */
  const dpState = useSelector(state => state.dpState);
  /**
   {
    "switch_led":{
        "type":"bool",
        "name":"开关",
        "mode":"rw",
        "code":"switch_led",
        "id":"20",
        "schemaType":"bool",
        "iconname":"icon-dp_power2",
        "extContent":"",
        "dptype":"obj"
    },
    "work_mode":{
        "type":"enum",
        "name":"模式",
        "mode":"rw",
        "code":"work_mode",
        "id":"21",
        "schemaType":"enum",
        "iconname":"icon-dp_list",
        "extContent":"",
        "dptype":"obj",
        "range":[
            "white",
            "colour",
            "scene",
            "music"
        ]
    },
    "bright_value":{
        "type":"value",
        "name":"亮度值",
        "mode":"rw",
        "code":"bright_value",
        "id":"22",
        "schemaType":"value",
        "iconname":"icon-dp_sun",
        "extContent":"",
        "dptype":"obj",
        "max":1000,
        "min":10,
        "scale":0,
        "step":1
    },
    "temp_value":{
        "type":"value",
        "name":"冷暖值",
        "mode":"rw",
        "code":"temp_value",
        "id":"23",
        "schemaType":"value",
        "iconname":"icon-dp_half",
        "extContent":"",
        "dptype":"obj",
        "max":1000,
        "min":0,
        "scale":0,
        "step":1
    },
    "colour_data":{
        "type":"string",
        "name":"彩光",
        "mode":"rw",
        "code":"colour_data",
        "id":"24",
        "schemaType":"string",
        "iconname":"icon-dp_light",
        "extContent":"",
        "dptype":"obj",
        "maxlen":255
    },
    "scene_data":{
        "type":"string",
        "name":"场景",
        "mode":"rw",
        "code":"scene_data",
        "id":"25",
        "schemaType":"string",
        "iconname":"icon-dp_box2",
        "extContent":"",
        "dptype":"obj",
        "maxlen":255
    },
    "countdown":{
        "type":"value",
        "name":"倒计时剩余时间",
        "mode":"rw",
        "code":"countdown",
        "id":"26",
        "schemaType":"value",
        "iconname":"icon-timer1",
        "extContent":"",
        "dptype":"obj",
        "max":86400,
        "min":0,
        "scale":0,
        "step":1
    },
    "control_data":{
        "type":"string",
        "name":"调节",
        "mode":"rw",
        "code":"control_data",
        "id":"28",
        "schemaType":"string",
        "iconname":"icon-setting",
        "extContent":"",
        "dptype":"obj",
        "maxlen":255
    }
}*/
  const dpSchema = useSelector(state => state.devInfo.schema);

  console.log('测试--------------style'+ JSON.stringify(style));

  if (_.isEmpty(dpState)) {
    return null;
  }

  const renderItem = ({ item }: { item: DpSchema }) => {
    return (
      <DpItemView
        style={styles.item}
        key={item.code}
        dpState={dpState[item.code]}
        dpSchema={item}
      />
    );
  };

  return (
    <TYFlatList<DpSchema>
      style={style}
      data={Object.values(dpSchema)}
      renderItem={({ item }) => renderItem({ item })}
      keyExtractor={item => item.code}
    />
  );
};

ContentLayout.defaultProps = {
  style: null,
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 5,
  },
});

export default ContentLayout;
