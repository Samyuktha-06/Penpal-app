<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <div>
    <h3>Registered Users</h3>
    <ul>
      <xsl:for-each select="users/user">
        <li>
          <xsl:value-of select="name"/>
        </li>
      </xsl:for-each>
    </ul>
  </div>
</xsl:template>

</xsl:stylesheet>
