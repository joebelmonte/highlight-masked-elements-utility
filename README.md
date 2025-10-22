# Highlight Masked Elements

This utility is designed to help identify which elements on a webpage will be masked during a cobrowse session, either for a specific role or for all roles. Further, it will list which rule or rules are causing the masking on a per-element basis.

To use it, follow these steps:

1. Paste all of the code from [showMaskedElements.js](/showMaskedElements.js) into the browser console and click return.
1. Then run one of the functions listed below in the `External Use` section: `showMaskedElements(roleName?)` or `showTheseMaskedElements([selectors])`.

## For External Use

### `showMaskedElements(roleName?)`

This will apply a red border and console log all elements found on the page that the group is configured to mask for the given role name, plus the selectors that are automatically masked (e.g., "input[type='password']")

If no role name is supplied, it will apply a red border and console log all elements found on the page that the group is configured to mask regardless of role, plus the selectors that are automatically masked.

**Parameters:**

- `roleName` _(String, optional)_ – The name of a role in the group.

**Returns:**

- An array of masked objects found on the page noting the element and the rule(s) that it matches.

```
[
    {
        element: element,
        rulesMatched:[selector1, selector2]
    }
]
```

### `showTheseMaskedElements([selectors])`

- This function scans the DOM looking for elements that match any of the selectors passed into the function, regardless of the group's settings.
  - This includes the selectors that are automatically masked (e.g., "input[type='password']")
  - The list of selectors is de-duped before scanning.
- It will then apply a red border and console log all elements found on the page that match one of those selectors.
- This is a good option to use if the page is not tagged at all.

**Parameters:**

- `[selectors]` _(Array, required)_ – An array of CSS selectors.

**Returns:**

- An array of objects found on the page noting the element and the rule(s) that it matches.

```
[
    {
        element: element,
        rulesMatched:[selector1, selector2]
    }
]
```

## For Internal Use

The functions above make use of the functions in this section, but the ones below are generally not designed to be called directly by the end user.

### `getGroupInfoFromScriptTag()`

- This function searches the document for the presence of a script tag.
- If found, it returns the group id and data-site attributes.
- If not found, it logs an error.

**Parameters:**

- _(None)_

**Returns:**

- An object including the group id and data-site values

```
{
  groupId: groupId,
  site: site,
}
```

### `getGroupMaskingRules(roleName?)`

- This function calls `getGroupInfoFromScriptTag` to get the group id and data-site values.
- It then makes an API request to get the relevant masked settings for that group.
- If no roleName is supplied, it returns the overall group's rules.
- If roleName is supplied, it filters for rules for that role.
  - If the roleName supplied does not match any roles for the group, it logs an error.

**Parameters:**

- `roleName` _(String, optional)_ – The name of a role in the group.

**Returns:**

- `[selectors]` – An array of CSS selectors.
