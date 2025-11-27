PostHog Events Documentation
Overview
This document outlines all PostHog analytics events implemented across the Finch (Plumbing) and Griffin (HVAC) applications. These events help track user interactions, feature usage, and workflow patterns.

## Event Categories
### 1. Keyboard Shortcuts
**Event Name:** `keyboard_shortcut_use_tool_id_tool_type`
**Description:** Tracks keyboard shortcut usage across the application to understand which shortcuts are most/least used.
**Tracked Shortcuts:**
Tool Selection Shortcuts:  All annotation tools, markup tools, selection tools
Clipboard Operations: Cut (Ctrl+X), Copy (Ctrl+C), Paste (Ctrl+V)
Navigation: Sheet Up (Shift+↑), Sheet Down (Shift+↓), Pan (P), Zoom In (=), Zoom Out (-)
Mode Toggles: Ortho Mode (Shift+O), Review Mode (Space), Display Circuits ©
Special Actions: Tag (Shift+T), Reclassify (Shift+R), Split Line (Shift+H), Undo (Ctrl+Z), Redo (Shift+Ctrl+Z)
Fitting Shortcuts (Griffin): Various HVAC fitting shortcuts (F+1 through F+8)
Tool Reset: Escape key

### 2. Toolbar Interactions
**Event Name:** `tool_clicked`
**Description:** Tracks when users click on toolbar tools to understand which tools are most frequently used.
**Note:** Custom tools can specify their own `posthog_event` property for specialized tracking.

### 3. Worksheet Panel Actions
#### 3.1 Sheet Deletion
**Event Name:** `sheet_delete_clicked`
**Description:** Tracks when users delete a worksheet/sheet.

#### 3.2 Sheet Duplication
**Event Name:** `sheet_duplicate_clicked`
**Description:** Tracks when users duplicate a worksheet/sheet.

#### 3.3 Sheet Rename
**Event Name:** `sheet_rename_clicked`
**Description:** Tracks when users rename a worksheet/sheet.

### 4. Feature Panel Actions
#### 4.1 Feature Deletion
**Event Name:** `feature_delete_clicked`
**Description:** Tracks when users delete a feature/layer from the feature panel.

#### 4.2 Locate Feature
**Event Name:** `locate_feature_clicked`
**Description:** Tracks when users click the locate icon to zoom to a feature on the map.

#### 4.3 Feature Visibility Toggle
**Event Name:** `eye_visible_clicked`
**Description:** Tracks when users toggle feature visibility (show/hide on map).

### 5. Filtering & Sorting
#### 5.1 Filtering
**Event Name:** `filtering_changed`
**Description:** Tracks when users apply filters to the feature list.

**Filter Types:**
- By AI-generated features
- By tags/groups
- With comments
- With measurements
- Without measurements

#### 5.2 Sorting
**Event Name:** `sorting_changed`
**Description:** Tracks when users apply sorting to the feature list.

### 6. Feature Generation

#### 6.1 Damper Generation (Griffin - HVAC Only)
**Event Name:** `damper_action_performed`
**Description:** Tracks when users generate or remove dampers in the HVAC workflow.
**Actions:**
- **Generate:** AI-generated damper placement
- **Undo:** Remove generated dampers

#### 6.2 Fittings Generation Toggle (Finch - Plumbing Only)

**Event Name:** `fittings_generation_toggled`
**Description:** Tracks when users enable/disable automatic fittings generation in the plumbing workflow.

### 7. Annotation Menu Events

#### 7.1 Tool Activation (Handle Annotation Menu)

**Event Name:** `tool_on_from_handle_annotation_menu`
**Description:** Tracks when annotation tools are activated from the annotation menu for existing features.
  

#### 7.2 Tool Activation (New Feature Annotation)
**Event Name:** `tool_on_from_handle_annotation_menu_to_annotate_feature`
**Description:** Tracks when annotation tools are activated to create new features.

### 8. Feature Creation

#### 8.1 Feature Creation from Feature-less Annotations
**Event Name:** `feature_creating_from_feature_less_annotations`
**Description:** Tracks when users create features from annotations that don't have associated features.

#### 8.2 Feature Creation with Measurements

**Event Name:** `feature_creating_with_measurements_from_feature_less_annotations`

**Description:** Tracks when users create features with measurements from feature-less annotations.

### 9. Search

**Event Name:** `search_feature`
**Description:** Tracks when users search for features in the feature panel.

### 10. Comments (Griffin Only)

#### 10.1 Comment Resolved
**Event Name:** `comment_resolved` (Note: Display name is "Comment resolved")
**Description:** Tracks when users resolve comments.

#### 10.2 Comment Created
**Event Name:** `comment_created`
**Description:** Tracks when users create new comments.

#### 10.3 Comment Edited

**Event Name:** `comment_edited`
**Description:** Tracks when users edit existing comments.

## How to View Events in PostHog

1. **Access PostHog Dashboard**
   - Login to your PostHog account
   - Navigate to the Events section

2. **Filter by Event Name**
   - Use the event names listed above to filter specific events
   - Example: Search for `keyboard_shortcut_used` to see all keyboard shortcut usage

3. **Analyze Event Properties**
   - Click on any event to see all captured properties
   - Use properties to create custom insights and dashboards

4. **Create Insights**
   - Most used keyboard shortcuts: Group by `shortcut_command`
   - Feature deletion patterns: Group by `feature_id` or `worksheet_id`
   - Tool usage frequency: Group by `tool_id` in `tool_clicked` events
   - Filter/sort preferences: Analyze `filtering_type` and `sorting_type` distributions



