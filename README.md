# 起業シミュレーター

複数の事業を、1つのリポジトリで独立して管理するための骨組みです。各事業のタスクは Markdown、成果物は事業別フォルダに保存します。

## 構成

現在の構成です。`counseling` はカウンセリング事業、`scarification` はスカリフィケーション事業、`house-cleaning` はハウスクリーニング事業（いずれも商圏：京都市）のフォルダです。

```text
startup-simulator/
├── README.md
├── AGENTS.md
├── templates/
│   ├── tasks.md
│   └── decisions.md
└── ventures/
    ├── counseling/
    │   ├── tasks.md
    │   ├── decisions.md
    │   ├── logo.png
    │   ├── index.html
    │   ├── hero.png
    │   └── room.png
    ├── scarification/
    │   ├── tasks.md
    │   └── decisions.md
    └── house-cleaning/
        ├── tasks.md
        ├── decisions.md
        ├── business-plan.md
        ├── index.html
        ├── reservation.html
        ├── google-business-profile.md
        ├── social.md
        └── その他の画像・表示用ファイル
```

新しい事業を始めるときに、次の構成を追加します。`<business-id>` はその事業を識別する名前です。

```text
ventures/<business-id>/
├── tasks.md
└── decisions.md
```

スカリフィケーション事業：[タスク一覧](ventures/scarification/tasks.md)・[決定事項](ventures/scarification/decisions.md)

ハウスクリーニング事業（仮屋号：京すみか）：[タスク一覧](ventures/house-cleaning/tasks.md)・[決定事項](ventures/house-cleaning/decisions.md)・[事業計画](ventures/house-cleaning/business-plan.md)

## 基本フロー

1. 既存の事業を選ぶ（まだない場合は「事業を追加する」の手順で作成する）
2. タスク一覧を見る
3. やるタスクを1つ選ぶ
4. そのタスクだけAIと作業する
5. 成果物を保存する
6. 完了したらチェックON
7. ユーザーが次のタスクを選ぶ

1つのタスクが完了しても、AIは勝手に次の未完了タスクへ進みません。次に進むタスクはユーザーが選びます。

## 使い方

1. 新しい事業を始めるときは `templates/tasks.md` と `templates/decisions.md` をその事業の `ventures/<business-id>/` に複製します。
2. その事業に不要なタスクは削除し、必要な固有タスクは追加します。
3. タスク状態はチェックのOFF/ONだけで管理します。未完了は `- [ ]`、完了は `- [x]` です。
4. ユーザーが取り組むタスクを1つ選び、AIとその作業を進めます。
5. 作業が完了したら成果物を同じ事業フォルダ直下に保存し、対象タスクを `- [x]` にします。
6. 次のタスクはユーザーが選びます。

「進行中」「確認待ち」「不要」などの別ステータスは使いません。

タスクの状態は各事業の `tasks.md`、承認済みの内容は `decisions.md` を正本とします。チャットの種類やタスクの完了前後にかかわらず承認内容を随時記録・更新し、再開時に確認します。素材（`logo.png` など）やホームページ（`index.html` など）は事業フォルダ直下に保存します。`artifacts/`・`assets/`・`website/` は作りません。

AIへの依頼例：

> 対象事業の tasks.md を見せて。

> 対象事業の「ロゴを作る」を進めて。

> 対象事業の「ロゴを作る」を完了にして。

> 対象事業に「○○」というタスクを追加して。

## 事業を追加する

未使用の管理用ID（`venture-001`、`venture-002` など）で `ventures/` に事業フォルダを作り、`templates/tasks.md` と `templates/decisions.md` をその事業内に複製します。成果物はその事業フォルダ直下に保存します。

「事業を決める」で内容が確定したら、AIが短い英小文字の名前を決め、例えば `ventures/counseling/` に一度変更します。同名の別事業がある場合は `counseling-002` から未使用の番号を付けます。タスク・成果物・チェック状態を保持し、参照リンクも更新します。屋号の決定ではフォルダ名を変更しません。詳しい手順は [AGENTS.md](AGENTS.md#事業フォルダの命名と変更) に記載しています。

共通テンプレートは `templates/tasks.md` と `templates/decisions.md` です。事業固有の変更は各事業内に反映し、共通テンプレートは明示的な依頼がある場合だけ変更します。

## 今回の範囲

タスク管理と成果物保存の骨組みのみです。Web画面、自動実行、外部サービス連携、本番用リポジトリへの切り出し機能は、ユーザーから依頼されるまで追加しません。

このリポジトリは公開されています。保存する内容は公開可能なものに限ります。
