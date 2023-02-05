import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Tier, TierId } from '@masochistme/sdk/dist/v1/types';

import { useTiers } from 'sdk';
import { MemberLeaderboards } from 'containers';
import {
	Checkbox,
	ErrorFallback,
	Flex,
	IconType,
	QueryBoundary,
	Skeleton,
	Switch,
} from 'components';
import { fonts, media, useTheme, ColorTokens } from 'styles';
import { useMixpanel } from 'hooks';

type Props = { memberId: string };

export const MemberProfileGames = (props: Props) => (
	<QueryBoundary
		fallback={<MemberProfileGamesSkeleton />}
		errorFallback={<ErrorFallback />}>
		<MemberProfileGamesBoundary {...props} />
	</QueryBoundary>
);

const MemberProfileGamesBoundary = (props: Props) => {
	const { memberId } = props;
	const { colorTokens } = useTheme();
	const { track } = useMixpanel();
	const [visibleTiers, setVisibleTiers] = useState<TierId[]>([]);
	const [isHideCompleted, setIsHideCompleted] = useState<boolean>(false);
	const [isHideUnfinished, setIsHideUnfinished] = useState<boolean>(false);

	const { tiersData } = useTiers();

	useEffect(() => {
		const allTiers = tiersData.map(tier => tier.id);
		setVisibleTiers(allTiers);
	}, [tiersData]);

	const handleHideCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsHideCompleted(event.target.checked);
		track('page.user.games.filter', { hideCompleted: event.target.checked });
	};
	const handleHideUnfinished = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsHideUnfinished(event.target.checked);
		track('page.user.games.filter', { hideUnfinished: event.target.checked });
	};

	return (
		<Flex column width="100%">
			<StyledFilterGame>
				<StyledFilterBar>
					<StyledFilterGameText colorTokens={colorTokens}>
						Filter games
					</StyledFilterGameText>
					{tiersData.map((tier: Tier) => (
						<Checkbox
							icon={tier.icon as IconType}
							itemType={tier.id}
							visibleItems={visibleTiers}
							setVisibleItems={setVisibleTiers}
						/>
					))}
				</StyledFilterBar>
				<StyledFilterGameSwitches column gap={8}>
					<Flex row align gap={16}>
						Hide completed{' '}
						<Switch checked={isHideCompleted} onChange={handleHideCompleted} />
					</Flex>
					<Flex row align gap={16}>
						Hide unfinished
						<Switch
							checked={isHideUnfinished}
							onChange={handleHideUnfinished}
						/>
					</Flex>
				</StyledFilterGameSwitches>
			</StyledFilterGame>
			<MemberLeaderboards
				steamId={memberId}
				filter={{ tiers: visibleTiers, isHideCompleted, isHideUnfinished }}
			/>
		</Flex>
	);
};

const MemberProfileGamesSkeleton = () => {
	const { colorTokens } = useTheme();
	return (
		<Flex column width="100%">
			<StyledFilterGame>
				<StyledFilterBar>
					<StyledFilterGameText colorTokens={colorTokens}>
						Filter games
					</StyledFilterGameText>
					<Skeleton width="300px" height="42px" />
				</StyledFilterBar>
				<StyledFilterGameSwitches column gap={8}>
					<Flex row align gap={16}>
						Hide completed <Switch checked={false} />
					</Flex>
					<Flex row align gap={16}>
						Hide unfinished
						<Switch checked={false} />
					</Flex>
				</StyledFilterGameSwitches>
			</StyledFilterGame>
		</Flex>
	);
};

const StyledFilterBar = styled(Flex)`
	align-items: center;
	gap: 24px;
	width: 100%;
`;

const StyledFilterGame = styled(Flex)`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	font-family: ${fonts.Dosis};
	font-weight: bold;
	width: 100%;
	padding-bottom: 16px;
	text-transform: uppercase;
	@media (max-width: ${media.tablets}) {
		flex-wrap: wrap;
	}
`;

const StyledFilterGameText = styled.span<{ colorTokens: ColorTokens }>`
	font-size: 1.5em;
	color: ${({ colorTokens }) => colorTokens['semantic-color--interactive']};
	@media (max-width: ${media.tablets}) {
		display: none;
	}
`;

const StyledFilterGameSwitches = styled(Flex)`
	font-size: 1em;
	word-wrap: nowrap;
	white-space: nowrap;
`;
