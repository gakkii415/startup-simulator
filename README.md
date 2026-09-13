# 起業シミュレーター

複数の事業を、1つのリポジトリで独立して管理するための骨組みです。各事業のタスクは Markdown、成果物は事業別フォルダに保存します。

## 構成

現在の構成です。`counseling` はカウンセリング事業、`scarification` はスカリフィケーション事業、`house-cleaning` はハウスクリーニング事業、`salon-interior` は小さなサロン向けインテリアコーディネート事業（いずれも商圏：京都市）のフォルダです。

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
    ├── salon-interior/
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

サロン向けインテリアコーディネート事業：[タスク一覧](ventures/salon-interior/tasks.md)・[決定事項](ventures/salon-interior/decisions.md)

## 基本フロー

**事業を入力 → AIが成果物一式を仮作成 → ユーザーが選んだ項目を修正**、が標準の流れです。

1. やりたい事業と、すでに決まっている条件を入力します。
2. AIが未指定の内容を仮決めし、タスク表の全項目について成果物を作ります。商圏が未指定なら京都市を仮採用します。
3. 成果物を事業フォルダに保存し、GitHubへ反映して、リンクと主な仮設定をまとめて提示します。作れなかった項目がある場合は、その理由も示します。
4. 一式を見た後、修正したい項目をユーザーが選びます。以後はその項目だけを作業します。

「まずは事業を決めます」という入力でも一括仮作成を始めます。最初から1つずつ進めたい場合は、「今回は事業決定だけ」「1つずつ進めたい」と明示してください。実行モードの判定・優先順位・終了条件は [AGENTS.md](AGENTS.md#実行モードと優先順位) を正本とします。

## 使い方

- 新規事業は共通テンプレートを複製して開始します。タスクの追加・削除はユーザーと合意した範囲で行います。
- タスク状態は `- [ ]`（未完了）と `- [x]`（完了）だけです。チェックONは成果物の完成を表し、ユーザーの承認済みを意味しません。
- `decisions.md` 内で「ユーザーが決めた内容」と「AIの仮設定」を区別します。仮作成後に承認・修正した内容を随時更新します。
- 素材（`logo.png` など）やホームページ（`index.html` など）は事業フォルダ直下に保存します。`artifacts/`・`assets/`・`website/` は作りません。
- 個別実行では対象項目の確認手順に従い、完了後は次の項目をユーザーが選ぶまで待ちます。

AIへの依頼例：

> 京都で小さなサロン向けのインテリアコーディネート事業。家具本体代は別。

> 今回は事業決定だけ。1つずつ進めたい。

> 対象事業の一括仮作成の続きを進めて。

> 対象事業の「ロゴを作る」だけ修正して。

> 対象事業の tasks.md を見せて。

> 対象事業に「○○」というタスクを追加して。

## 事業を追加する

未使用の管理用ID（`venture-001`、`venture-002` など）で `ventures/` に事業フォルダを作り、`templates/tasks.md` と `templates/decisions.md` をその事業内に複製します。成果物はその事業フォルダ直下に保存します。

「事業を決める」で内容が確定したら、AIが短い英小文字の名前を決め、例えば `ventures/counseling/` に一度変更します。同名の別事業がある場合は `counseling-002` から未使用の番号を付けます。タスク・成果物・チェック状態を保持し、参照リンクも更新します。屋号の決定ではフォルダ名を変更しません。詳しい手順は [AGENTS.md](AGENTS.md#事業フォルダの命名と変更) に記載しています。

共通テンプレートは `templates/tasks.md` と `templates/decisions.md` です。事業固有の変更は各事業内に反映し、共通テンプレートは明示的な依頼がある場合だけ変更します。

## 今回の範囲

Markdownでタスクと決定事項を管理し、AIが各事業の画像・ホームページ・フォーム等のシミュレーション成果物を作成します。シミュレーター自体の管理画面・自動実行基盤・外部サービス連携・本番用リポジトリへの切り出し機能は、依頼がある場合だけ追加します。

このリポジトリは公開されています。保存する内容は公開可能なものに限ります。
