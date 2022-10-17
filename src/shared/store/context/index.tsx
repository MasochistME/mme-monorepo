import React, { useContext, useState } from 'react';
import { SDK } from '@masochistme/sdk/dist/v1/sdk';
import { TierId } from '@masochistme/sdk/dist/v1/types';

import { TabDict } from 'shared/config/tabs';
import config from 'config.json';

export enum GameView {
	LIST = 'list',
	TILE = 'tiles',
}

type ContextType = {
	sdk: SDK;
	path: string;

	activeTab: TabDict;
	setActiveTab: (activeTab: TabDict) => void;
	gameListView: GameView;
	setGameListView: (gameListView: GameView) => void;
	visibleTiers: TierId[];
	setVisibleTiers: (visibleTiers: TierId[]) => void;

	queryGame: string;
	setQueryGame: (queryGame: string) => void;
	queryMember: string;
	setQueryMember: (queryMember: string) => void;
};

export const AppContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	const [activeTab, setActiveTab] = useState<TabDict>(TabDict.HOME);
	const [gameListView, setGameListView] = useState<GameView>(GameView.TILE);
	const [visibleTiers, setVisibleTiers] = useState<TierId[]>([]);
	const [queryGame, setQueryGame] = useState<string>('');
	const [queryMember, setQueryMember] = useState<string>('');

	const path = config.API;
	const sdk = new SDK({
		host: config.API,
		authToken: config.ACCESS_TOKEN,
	});

	const value = {
		path,
		sdk,

		activeTab,
		setActiveTab,
		gameListView,
		setGameListView,
		visibleTiers,
		setVisibleTiers,

		queryGame,
		setQueryGame,
		queryMember,
		setQueryMember,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const AppContext = React.createContext({} as ContextType);
export const useAppContext = (): ContextType => useContext(AppContext);
