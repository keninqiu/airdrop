import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/data_provider.dart';
import '../widgets/airdrop_card.dart';
import '../widgets/post_card.dart';
import 'settings_screen.dart';
import 'package:airdropapp/l10n/app_localizations.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<DataProvider>(context, listen: false).fetchData();
    });
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final dataProvider = Provider.of<DataProvider>(context);

    final List<Widget> pages = [
      _buildAirdropsList(dataProvider, l10n),
      _buildPostsList(dataProvider, l10n),
      const SettingsScreen(),
    ];

    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.appTitle),
      ),
      body: pages[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        items: [
          BottomNavigationBarItem(
            icon: const Icon(Icons.card_giftcard),
            label: l10n.airdrops,
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.article),
            label: l10n.posts,
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.settings),
            label: l10n.settings,
          ),
        ],
      ),
    );
  }

  Widget _buildAirdropsList(DataProvider provider, AppLocalizations l10n) {
    if (provider.isLoading) {
      return const Center(child: CircularProgressIndicator());
    }
    if (provider.error != null) {
      return Center(child: Text('${l10n.error}: ${provider.error}'));
    }
    return ListView.builder(
      itemCount: provider.airdrops.length,
      itemBuilder: (context, index) {
        return AirdropCard(airdrop: provider.airdrops[index]);
      },
    );
  }

  Widget _buildPostsList(DataProvider provider, AppLocalizations l10n) {
    if (provider.isLoading) {
      return const Center(child: CircularProgressIndicator());
    }
    if (provider.error != null) {
      return Center(child: Text('${l10n.error}: ${provider.error}'));
    }
    return ListView.builder(
      itemCount: provider.posts.length,
      itemBuilder: (context, index) {
        return PostCard(post: provider.posts[index]);
      },
    );
  }
}
