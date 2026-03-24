/**
 * AppNavigator – Floating pill tab bar (matches Stitch exactly)
 */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { VisualizerScreen } from '../screens/VisualizerScreen';
import { AStarScreen } from '../screens/AStarScreen';
import { AlphaBetaScreen } from '../screens/AlphaBetaScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { colors } from '../theme/colors';

type LearnStackParamList = { LearnList: undefined; AStar: undefined; AlphaBeta: undefined };
const LearnStack = createNativeStackNavigator<LearnStackParamList>();
const LearnStackNavigator = () => (
  <LearnStack.Navigator screenOptions={{ headerShown: false }}>
    <LearnStack.Screen name="LearnList" component={VisualizerScreen} />
    <LearnStack.Screen name="AStar" component={AStarScreen} />
    <LearnStack.Screen name="AlphaBeta" component={AlphaBetaScreen} />
  </LearnStack.Navigator>
);

type HomeStackParamList = { HomeMain: undefined; AStar: undefined; AlphaBeta: undefined };
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const HomeStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeMain" component={HomeScreen} />
    <HomeStack.Screen name="AStar" component={AStarScreen} />
    <HomeStack.Screen name="AlphaBeta" component={AlphaBetaScreen} />
  </HomeStack.Navigator>
);

export type RootTabParamList = { Home: undefined; Learn: undefined; Chat: undefined };
const Tab = createBottomTabNavigator<RootTabParamList>();

const icons: Record<keyof RootTabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'home',
  Learn: 'school',
  Chat: 'chatbubbles',
};

export const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: '#A1A1AA',
      tabBarStyle: {
        position: 'absolute',
        left: 24, right: 24, bottom: 24,
        backgroundColor: 'rgba(255,255,255,0.80)',
        borderTopWidth: 0,
        borderRadius: 24,
        height: 64,
        paddingTop: 8,
        paddingBottom: 8,
        borderWidth: 1,
        borderColor: 'rgba(186,186,175,0.15)',
        shadowColor: 'rgba(55,56,49,0.12)',
        shadowOpacity: 1,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        elevation: 10,
      },
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '500',
        letterSpacing: 0.3,
      },
      tabBarItemStyle: {
        marginHorizontal: 4,
        borderRadius: 14,
      },
      tabBarIcon: ({ color, size, focused }) => (
        <Ionicons color={color} name={icons[route.name as keyof RootTabParamList]} size={focused ? size + 2 : size} />
      ),
    })}
  >
    <Tab.Screen name="Home" component={HomeStackNavigator}
      options={{ tabBarLabel: 'Home', tabBarActiveBackgroundColor: 'rgba(93,75,225,0.05)' }} />
    <Tab.Screen name="Learn" component={LearnStackNavigator}
      options={{ tabBarLabel: 'Learn', tabBarActiveBackgroundColor: 'rgba(93,75,225,0.05)' }} />
    <Tab.Screen name="Chat" component={ChatScreen}
      options={{ tabBarLabel: 'Chat', tabBarActiveBackgroundColor: 'rgba(93,75,225,0.05)' }} />
  </Tab.Navigator>
);
