// Copyright 2018 Unique. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// 日志等级
const _logLevels = ['off', 'error', 'warn', 'info', 'log', 'debug']
// 日志等级检索
let _levelMap = {}
/**
 * 生成日志等级的矩阵表，用于迅速判断日志消息是否处理
 */
function _makeLevelMap() {
  _logLevels.forEach(level => {
    const levelIndex = _logLevels.indexOf(level)
    _levelMap[level] = {}
    _logLevels.forEach(type => {
      const typeIndex = _logLevels.indexOf(type)
      if (typeIndex <= levelIndex) {
        _levelMap[level][type] = true
      }
    })
  })
}
_makeLevelMap()

/**
 * 判断日志消息是否被处理
 * @param  {string} type
 * @return {boolean}
 */
let _level = 'log'
function _checkLevel(type) {
  // 获取当前log等级
  let logLevel = _level || 'log'
  return _levelMap[logLevel] && _levelMap[logLevel][type]
}

/**
 * 根据运行环境设置控制台
 */
const logger = {}

logger.setLevel = (level) => {
  _level = level || 'log'
}

logger.debug = (...args) => {
  if (_checkLevel('debug')) {
    console.debug.apply(console, args)
  }
}

logger.log = (...args) => {
  if (_checkLevel('log')) {
    console.log.apply(console, args)
  }
}

logger.info = (...args) => {
  if (_checkLevel('info')) {
    console.info.apply(console, args)
  }
}

logger.warn = (...args) => {
  if (_checkLevel('warn')) {
    console.warn.apply(console, args)
  }
}

logger.error = (...args) => {
  if (_checkLevel('error')) {
    console.error.apply(console, args)
  }
}

export default logger
